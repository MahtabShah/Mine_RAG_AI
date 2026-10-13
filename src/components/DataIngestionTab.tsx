import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  CheckCircle2,
  Layers,
  ArrowRight,
  Info,
  RotateCcw
} from 'lucide-react';
import { PRESET_DATASETS } from '../data/presets';
import { DataChunk, DatasetAnalysis, DatasetStats } from '../types';

interface DataIngestionTabProps {
  topic: string;
  setTopic: (t: string) => void;
  datasetTitle: string;
  setDatasetTitle: (t: string) => void;
  rawText: string;
  setRawText: (t: string) => void;
  chunks: DataChunk[];
  stats: DatasetStats | null;
  analysis: DatasetAnalysis | null;
  onTrainComplete: (chunks: DataChunk[], stats: DatasetStats, analysis: DatasetAnalysis) => void;
  onNavigateToChat: () => void;
}

export const DataIngestionTab: React.FC<DataIngestionTabProps> = ({
  topic,
  setTopic,
  datasetTitle,
  setDatasetTitle,
  rawText,
  setRawText,
  chunks,
  stats,
  analysis,
  onTrainComplete,
  onNavigateToChat,
}) => {
  const [inputMode, setInputMode] = useState<'preset' | 'paste' | 'upload'>('preset');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectPreset = (presetId: string) => {
    const selected = PRESET_DATASETS.find((p) => p.id === presetId);
    if (selected) {
      setTopic(selected.topic);
      setDatasetTitle(selected.title);
      setRawText(selected.content);
      setErrorMessage(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setDatasetTitle(file.name.replace(/\.[^/.]+$/, ''));
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setRawText(content);
        if (!topic) {
          setTopic(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
        }
      }
    };
    reader.readAsText(file);
  };

  const handleTrainModel = async () => {
    if (!rawText.trim()) {
      setErrorMessage('Please provide dataset content before indexing.');
      return;
    }
    if (!topic.trim()) {
      setErrorMessage('Please specify the topic name.');
      return;
    }

    setErrorMessage(null);
    setIsProcessing(true);

    try {
      const response = await fetch('/api/index-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic.trim(),
          title: datasetTitle.trim() || 'Custom Mining Dataset',
          dataContent: rawText.trim(),
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with ${response.status}`);
      }

      const data = await response.json();
      setIsProcessing(false);
      onTrainComplete(data.chunks, data.stats, data.analysis);
    } catch (err: any) {
      setIsProcessing(false);
      setErrorMessage(err.message || 'Failed to index data.');
    }
  };

  const wordCount = rawText.trim() ? rawText.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = rawText.length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Editorial Header Section */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Dataset Training &amp; Knowledge Index
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Configure the active dataset, adjust semantic chunk parameters, and ground the model's retrieval engine. Data from DGMS SANKET reports on mine inundation is preloaded and ready to query.
        </p>
      </div>

      {/* Main Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Form & Content Input (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Metadata Section */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              1. Dataset Identity
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Topic / Subject Field
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Mine Inundation & Water Irruption"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Document / Archive Title
                </label>
                <input
                  type="text"
                  value={datasetTitle}
                  onChange={(e) => setDatasetTitle(e.target.value)}
                  placeholder="e.g. DGMS SANKET Inundation Analysis (1901-2022)"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                />
              </div>
            </div>
          </div>

          {/* Dataset Source Selection */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                2. Dataset Content Source
              </h2>

              {/* Segmented Source Controls */}
              <div className="flex p-0.5 bg-slate-100 dark:bg-slate-950 rounded-lg border border-slate-200/80 dark:border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => setInputMode('preset')}
                  className={`px-3 py-1.5 rounded-md font-medium transition ${
                    inputMode === 'preset'
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  DGMS Presets
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('paste')}
                  className={`px-3 py-1.5 rounded-md font-medium transition ${
                    inputMode === 'paste'
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Paste Text
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('upload')}
                  className={`px-3 py-1.5 rounded-md font-medium transition ${
                    inputMode === 'upload'
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Upload File
                </button>
              </div>
            </div>

            {/* Presets List */}
            {inputMode === 'preset' && (
              <div className="space-y-2.5">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select a curated dataset to instantly train and query the model:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRESET_DATASETS.map((preset) => {
                    const isSelected = datasetTitle === preset.title;
                    return (
                      <div
                        key={preset.id}
                        onClick={() => handleSelectPreset(preset.id)}
                        className={`p-3.5 rounded-lg border cursor-pointer transition text-left ${
                          isSelected
                            ? 'border-slate-900 dark:border-white bg-slate-50 dark:bg-slate-800/60 ring-1 ring-slate-900/10 dark:ring-white/10'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                          <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                            {preset.courseCode}
                          </span>
                          {isSelected && (
                            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                              <CheckCircle2 className="h-3 w-3" /> Active
                            </span>
                          )}
                        </div>
                        <h3 className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-1">
                          {preset.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {preset.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* File Upload Mode */}
            {inputMode === 'upload' && (
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".txt,.md,.json,.csv"
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center cursor-pointer hover:border-slate-400 dark:hover:border-slate-600 transition bg-slate-50 dark:bg-slate-950/40"
                >
                  <Upload className="h-6 w-6 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Click to browse or drop file here
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Accepts plain text, markdown, CSV, or JSON exports
                  </p>
                </div>
              </div>
            )}

            {/* Raw Text Preview & Editor */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Text Buffer:</span>
                <span className="font-mono">
                  {wordCount.toLocaleString()} words · {charCount.toLocaleString()} chars
                </span>
              </div>
              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                rows={10}
                placeholder="Dataset content..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white leading-relaxed"
              />
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-lg text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                <Info className="h-4 w-4 shrink-0 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Train CTA Strip */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-slate-400" />
                <span>Sliding window: 750 characters with 150 char overlap</span>
              </div>

              <button
                type="button"
                onClick={handleTrainModel}
                disabled={isProcessing || !rawText.trim()}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-2 ${
                  isProcessing
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-wait'
                    : !rawText.trim()
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 shadow-xs'
                }`}
              >
                {isProcessing ? (
                  <>
                    <RotateCcw className="h-3.5 w-3.5 animate-spin" />
                    <span>Processing Chunks...</span>
                  </>
                ) : (
                  <>
                    <FileText className="h-3.5 w-3.5" />
                    <span>Index Knowledge Base</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Knowledge Status Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Knowledge State
            </h3>

            {chunks.length > 0 && stats ? (
              <div className="space-y-4 text-xs">
                {/* Clean unboxed stats */}
                <div className="grid grid-cols-2 gap-3 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200/60 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 block">Total Chunks</span>
                    <span className="text-base font-bold font-mono text-slate-900 dark:text-white">
                      {stats.totalChunks}
                    </span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200/60 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 block">Total Words</span>
                    <span className="text-base font-bold font-mono text-slate-900 dark:text-white">
                      {stats.totalWords.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                {analysis?.summary && (
                  <div className="space-y-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 block">
                      Scope Overview:
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                      {analysis.summary}
                    </p>
                  </div>
                )}

                {/* Key Concepts */}
                {analysis?.keyConcepts && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 block">
                      Key Topics Covered:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {analysis.keyConcepts.map((kc, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono"
                        >
                          {kc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={onNavigateToChat}
                  className="w-full py-2.5 px-3 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold text-xs flex items-center justify-center gap-1.5 hover:opacity-90 transition shadow-xs mt-2"
                >
                  <span>Open Q&amp;A Chat</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 space-y-2 text-xs">
                <p className="font-medium text-slate-700 dark:text-slate-300">No Data Indexed Yet</p>
                <p className="text-slate-500">
                  Select a preset or paste data on the left to index.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
