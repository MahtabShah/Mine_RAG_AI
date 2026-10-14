import { useNavigate } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";

export default function KnowledgeBase() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-1 items-center justify-center px-5 py-12">
      <div className="max-w-2xl text-center">
        <div className="mx-auto mb-5 flex size-[60px] items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          <BookOpen size={30} />
        </div>

        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          Knowledge Base Not Loaded
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-6 text-slate-600">
          Load or index the DGMS Inundation records on the Train Data tab to
          enable query answering.
        </p>

        <button
          onClick={() => navigate("/train")}
          className="mx-auto mt-5 inline-flex items-center gap-3 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
          Open Train Data
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
