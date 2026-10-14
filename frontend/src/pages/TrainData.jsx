import { useState } from "react";
import { Database, FileText, RefreshCw } from "lucide-react";

export default function TrainData() {
  const [status, setStatus] = useState("Ready to connect");

  async function indexDocuments() {
    setStatus("Connecting to backend...");
    try {
      const response = await fetch("http://127.0.0.1:8000/index", {
        method: "POST",
      });

      if (!response.ok) throw new Error("Indexing request failed");

      const data = await response.json();
      setStatus(data.message || "Indexing completed.");
    } catch {
      setStatus(
        "Backend unavailable. Start FastAPI and implement POST /index.",
      );
    }
  }

  return (
    <section className="mx-auto w-full max-w-4xl flex-1 px-5 py-12">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          <Database size={30} />
        </div>
        <h2 className="text-2xl font-semibold text-slate-900">Train Data</h2>
        <p className="mt-2 text-slate-500">
          Index your local documents for retrieval-augmented generation.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <FileText className="text-blue-600" size={24} />
          <div>
            <h3 className="font-semibold text-slate-900">Document dataset</h3>
            <p className="text-sm text-slate-500">
              Fixed PDF records configured on your backend
            </p>
          </div>
        </div>

        <button
          onClick={indexDocuments}
          className="mt-6 flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-700">
          <RefreshCw size={17} />
          Index Documents
        </button>

        <p role="status" className="mt-4 text-sm text-slate-600">
          {status}
        </p>
      </div>
    </section>
  );
}
