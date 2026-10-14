import React, { useState } from 'react';
import { Search, BookOpen, Copy, Check } from 'lucide-react';
import { DataChunk, DatasetStats, DatasetAnalysis } from '../types';

interface KnowledgeBaseViewerProps {
  topic: string;
  chunks: DataChunk[];
  stats: DatasetStats | null;
  analysis: DatasetAnalysis | null;
  onNavigateToIngest: () => void;
}

export const KnowledgeBaseViewer: React.FC<KnowledgeBaseViewerProps> = ({
  topic,
  chunks,
  stats,
  analysis,
  onNavigateToIngest,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedChunkId, setCopiedChunkId] = useState<string | null>(null);

  const handleCopyChunk = (chunk: DataChunk) => {
    navigator.clipboard.writeText(chunk.text);
    setCopiedChunkId(chunk.id);
    setTimeout(() => setCopiedChunkId(null), 2000);
  };

  const filteredChunks = chunks.filter((c) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      c.text.toLowerCase().includes(term) ||
      (c.sectionHeader && c.sectionHeader.toLowerCase().includes(term)) ||
      c.index.toString() === term
    );
  });

  if (chunks.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <BookOpen className="h-10 w-10 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">No Indexed Chunks</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
          Please index your dataset first on the Train Data tab.
        </p>
        <button
          onClick={onNavigateToIngest}
          className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-semibold hover:opacity-90 transition"
        >
          Go to Train Data
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Header Info */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5 space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {topic} Knowledge Repository
            </h1>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <span>{chunks.length} Semantic Chunks</span>
              <span aria-hidden="true">·</span>
              <span>{stats?.totalWords.toLocaleString() || '0'} Total Words</span>
              <span aria-hidden="true">·</span>
              <span>DGMS Archival Source</span>
            </div>
          </div>
        </div>

        {/* Semantic Anchors */}
        {analysis?.keyConcepts && (
          <div className="pt-2 text-xs flex items-center flex-wrap gap-1.5">
            <span className="text-slate-500 font-medium mr-1">Extracted Concepts:</span>
            {analysis.keyConcepts.map((concept, i) => (
              <span
                key={i}
                className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-mono border border-slate-200/60 dark:border-slate-700/60"
              >
                {concept}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search within chunks (e.g. Chasnalla, Khoodia, 0991, 60m, Inquiry)..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition shadow-xs"
          />
        </div>
        <span className="text-xs text-slate-500 font-mono shrink-0">
          {filteredChunks.length} of {chunks.length}
        </span>
      </div>

      {/* Chunks List */}
      <div className="space-y-3.5">
        {filteredChunks.map((chunk) => (
          <div
            key={chunk.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 transition space-y-2.5 shadow-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                  Chunk #{chunk.index}
                </span>
                <span aria-hidden="true" className="text-slate-400">·</span>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium truncate max-w-xs sm:max-w-md">
                  {chunk.sectionHeader || `Section ${chunk.index}`}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                  {chunk.wordCount} words
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyChunk(chunk)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
                  title="Copy chunk text"
                >
                  {copiedChunkId === chunk.id ? (
                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>

            <pre className="text-xs font-mono text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
              {chunk.text}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};
