
from pathlib import Path

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

print("Loading embedding model...")
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")


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

        paragraphs = [
            paragraph.text
            for paragraph in document.paragraphs
        ]

        # Extract text from tables too.
        for table in document.tables:
            for row in table.rows:
                paragraphs.append(
                    " | ".join(cell.text for cell in row.cells)
                )

        return "\n".join(paragraphs)

    elif extension == ".txt":
        return file_path.read_text(
            encoding="utf-8",
            errors="replace",
        )

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
# MAIN INGESTION PIPELINE
# --------------------------------------------------

def main():

    if not DATA_DIR.exists():
        raise FileNotFoundError(
            f"Data folder not found: {DATA_DIR}"
        )

    # Find all supported files inside data/.
    files = sorted(
        path
        for path in DATA_DIR.rglob("*")
        if path.is_file()
        and path.suffix.lower() in {
            ".pdf",
            ".docx",
            ".txt",
        }
    )

    if not files:
        print("No PDF, DOCX, or TXT files found in data/.")
        return

    documents = []
    ids = []
    metadatas = []

    successful_files = 0

    print(f"\nFound {len(files)} files.")

    # --------------------------------------------------
    # EXTRACT AND CHUNK EVERY DOCUMENT
    # --------------------------------------------------

    for file_path in files:

        print(f"\nReading: {file_path.name}")

        try:
            text = extract_text(file_path)

        except Exception as exc:
            print(f"Could not read {file_path.name}: {exc}")
            continue

        if not text.strip():
            print(
                "No extractable text found. "
                "This may be a scanned PDF requiring OCR."
            )
            continue

        chunks = chunk_text(text)

        if not chunks:
            print("No text chunks generated.")
            continue

        successful_files += 1

        for index, chunk in enumerate(chunks):

            documents.append(chunk)

            # Include relative path to avoid ID collisions
            # when different folders contain identical filenames.
            relative_path = file_path.relative_to(DATA_DIR).as_posix()
            document_id = f"{relative_path}:{index}"

            ids.append(document_id)

            metadatas.append({
                "source": relative_path,
                "chunk": index,
            })

        print(f"Extracted characters: {len(text)}")
        print(f"Chunks created: {len(chunks)}")

    # Never delete the existing collection if extraction fails.
    if not documents:
        print(
            "\nNo text was extracted successfully."
            "\nExisting knowledge collection was not changed."
        )
        return

    # --------------------------------------------------
    # CREATE EMBEDDINGS
    # --------------------------------------------------

    print(
        f"\nCreating embeddings for "
        f"{len(documents)} chunks..."
    )

    embeddings = embedding_model.encode(
        documents,
        batch_size=32,
        show_progress_bar=True,
        normalize_embeddings=True,
    ).tolist()

    # --------------------------------------------------
    # CONNECT TO PERSISTENT CHROMADB
    # --------------------------------------------------

    client = chromadb.PersistentClient(
        path=str(DB_DIR)
    )

    # Prepare the new collection before replacing the old one.
    new_collection_name = f"{COLLECTION_NAME}_new"

    try:
        client.delete_collection(
            name=new_collection_name
        )
    except Exception:
        pass

    new_collection = client.create_collection(
        name=new_collection_name,
        metadata={"hnsw:space": "cosine"},
    )

    # Insert in batches.
    batch_size = 500

    try:
        for start in range(0, len(documents), batch_size):
            end = min(start + batch_size, len(documents))

            new_collection.add(
                ids=ids[start:end],
                documents=documents[start:end],
                embeddings=embeddings[start:end],
                metadatas=metadatas[start:end],
            )

        print(
            f"\nNew collection prepared with "
            f"{new_collection.count()} chunks."
        )

        # Replace the previous collection only after
        # the new collection has been populated.
        # ChromaDB 1.5.9: keep the prepared collection
        # under its existing name; do not rename it.
        collection = client.get_collection(
            name=new_collection_name
        )

        if collection.count() != len(documents):
            raise RuntimeError(
                "Chunk count mismatch. "
                "Expected {}, found {}.".format(
                    len(documents), collection.count()
                )
            )

        print("Verified all chunks in the new collection.")

    except Exception:
        # Keep the old collection if inserting fails.
        try:
            client.delete_collection(
                name=new_collection_name
            )
        except Exception:
            pass

        raise

    # --------------------------------------------------
    # SUCCESS
    # --------------------------------------------------

    collection = client.get_collection(
      name=f"{COLLECTION_NAME}_new"
    )

    print("\n====================================")
    print("INGESTION COMPLETED SUCCESSFULLY")
    print("====================================")
    print(f"Files discovered: {len(files)}")
    print(f"Files processed: {successful_files}")
    print(f"Total chunks stored: {collection.count()}")
    print(f"Database location: {DB_DIR}")
    print("Keyword filtering: DISABLED")
    print("All extracted document content indexed.")
    print("====================================")


if __name__ == "__main__":
    main()
