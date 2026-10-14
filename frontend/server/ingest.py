from pathlib import Path
import gc

import chromadb
from sentence_transformers import SentenceTransformer
from pypdf import PdfReader
from docx import Document


# --------------------------------------------------
# CONFIGURATION
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
DB_DIR = BASE_DIR / "chroma_db"

COLLECTION_NAME = "professor_knowledge"


# --------------------------------------------------
# LAZY EMBEDDING MODEL
# --------------------------------------------------

_embedding_model = None


def get_embedding_model():
    """Load the sentence-transformer model on first use."""
    global _embedding_model

    if _embedding_model is None:
        print("[ingest] Loading embedding model...", flush=True)
        _embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
        print("[ingest] Embedding model loaded.", flush=True)

    return _embedding_model


# --------------------------------------------------
# EXTRACT TEXT FROM FILES
# --------------------------------------------------

def extract_text(file_path: Path) -> str:
    extension = file_path.suffix.lower()

    if extension == ".pdf":
        reader = PdfReader(str(file_path))
        pages = []
        for page in reader.pages:
            pages.append(page.extract_text() or "")
        return "\n".join(pages)

    elif extension == ".docx":
        document = Document(str(file_path))
        paragraphs = [p.text for p in document.paragraphs]
        for table in document.tables:
            for row in table.rows:
                paragraphs.append(
                    " | ".join(cell.text for cell in row.cells)
                )
        return "\n".join(paragraphs)

    elif extension == ".txt":
        return file_path.read_text(encoding="utf-8", errors="replace")

    return ""


# --------------------------------------------------
# SPLIT TEXT INTO CHUNKS
# --------------------------------------------------

def chunk_text(
    text: str,
    chunk_size: int = 1000,
    overlap: int = 150,
) -> list[str]:
    text = " ".join(text.split())

    if not text:
        return []

    chunks = []
    start = 0

    while start < len(text):
        end = min(start + chunk_size, len(text))
        chunk = text[start:end].strip()
        if chunk:
            chunks.append(chunk)
        if end == len(text):
            break
        start = end - overlap

    return chunks


# --------------------------------------------------
# BUILD INDEX (MEMORY-OPTIMIZED)
# --------------------------------------------------

def build_index(
    client=None,
    collection_name=None,
    embedding_model=None,
):
    """
    Build the ChromaDB collection from files in data/.

    - Embeds in small batches to stay under Render's 512 MB limit.
    - Adds each batch immediately to ChromaDB so we never hold
      all embeddings in memory at once.
    - Returns the populated collection.
    """

    if collection_name is None:
        collection_name = f"{COLLECTION_NAME}_new"

    if client is None:
        client = chromadb.PersistentClient(path=str(DB_DIR))

    if embedding_model is None:
        embedding_model = get_embedding_model()

    if not DATA_DIR.exists():
        raise FileNotFoundError(f"Data folder not found: {DATA_DIR}")

    # -------- find files --------
    files = sorted(
        path
        for path in DATA_DIR.rglob("*")
        if path.is_file()
        and path.suffix.lower() in {".txt"}
    )

    if not files:
        raise FileNotFoundError("No PDF, DOCX, or TXT files found in data/.")

    print(f"[build_index] Found {len(files)} files.", flush=True)

    # -------- extract + chunk --------
    documents = []
    ids = []
    metadatas = []
    successful_files = 0

    for file_path in files:
        print(f"[build_index] Reading: {file_path.name}", flush=True)

        try:
            text = extract_text(file_path)
        except Exception as exc:
            print(f"[build_index] Skipping {file_path.name}: {exc}", flush=True)
            continue

        if not text.strip():
            print(
                f"[build_index] No extractable text in {file_path.name}.",
                flush=True,
            )
            continue

        chunks = chunk_text(text)
        if not chunks:
            continue

        successful_files += 1

        for index, chunk in enumerate(chunks):
            relative_path = file_path.relative_to(DATA_DIR).as_posix()
            documents.append(chunk)
            ids.append(f"{relative_path}:{index}")
            metadatas.append({"source": relative_path, "chunk": index})

        print(
            f"[build_index] {file_path.name}: {len(chunks)} chunks",
            flush=True,
        )

    if not documents:
        raise RuntimeError("No text extracted from any file.")

    print(
        f"[build_index] Total chunks to embed: {len(documents)}",
        flush=True,
    )

    # -------- fresh collection --------
    try:
        client.delete_collection(name=collection_name)
    except Exception:
        pass

    collection = client.create_collection(
        name=collection_name,
        metadata={"hnsw:space": "cosine"},
    )

    # -------- embed in small batches, add immediately --------
    embed_batch_size = 16   # kitne chunks ek baar embed karo
    model_batch_size = 8    # model internal batch

    total = len(documents)

    for start in range(0, total, embed_batch_size):
        end = min(start + embed_batch_size, total)

        batch_docs = documents[start:end]
        batch_ids = ids[start:end]
        batch_metas = metadatas[start:end]

        batch_embeddings = embedding_model.encode(
            batch_docs,
            batch_size=model_batch_size,
            show_progress_bar=False,
            normalize_embeddings=True,
        ).tolist()

        collection.add(
            ids=batch_ids,
            documents=batch_docs,
            embeddings=batch_embeddings,
            metadatas=batch_metas,
        )

        # free memory
        del batch_embeddings
        gc.collect()

        print(f"[build_index] Added {end}/{total} chunks", flush=True)

    print(
        f"[build_index] Done. {collection.count()} chunks stored.",
        flush=True,
    )

    return collection


# --------------------------------------------------
# CLI ENTRYPOINT (standalone ingestion)
# --------------------------------------------------

def main():
    client = chromadb.PersistentClient(path=str(DB_DIR))
    collection = build_index(
        client=client,
        collection_name=f"{COLLECTION_NAME}_new",
    )

    print("\n====================================")
    print("INGESTION COMPLETED SUCCESSFULLY")
    print("====================================")
    print(f"Total chunks stored: {collection.count()}")
    print(f"Database location: {DB_DIR}")
    print("====================================")


if __name__ == "__main__":
    main()