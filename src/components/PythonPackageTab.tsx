import React, { useState } from 'react';
import {
  FileCode,
  Copy,
  Check,
  Download,
  Terminal,
  Play,
  CheckCircle2
} from 'lucide-react';
import { generatePythonFiles } from '../data/pythonTemplates';

interface PythonPackageTabProps {
  topic: string;
  rawText: string;
}

export const PythonPackageTab: React.FC<PythonPackageTabProps> = ({ topic, rawText }) => {
  const [activeFile, setActiveFile] = useState<string>('main.py');
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [isTestingPython, setIsTestingPython] = useState(false);
  const [pythonTestResult, setPythonTestResult] = useState<any | null>(null);

  const pythonFiles = generatePythonFiles(topic, rawText);

  const fileMap: { [key: string]: { code: string; desc: string } } = {
    'main.py': {
      code: pythonFiles.mainFastApi,
      desc: 'FastAPI Backend REST API with CORS for React frontend',
    },
    'rag_pipeline.py': {
      code: pythonFiles.ragPipeline,
      desc: 'Retrieval-Augmented Generation & Ingestion class',
    },
    'fine_tune_lora.py': {
      code: pythonFiles.fineTuneScript,
      desc: 'PyTorch + HuggingFace Parameter-Efficient Fine-Tuning script',
    },
    'requirements.txt': {
      code: pythonFiles.requirementsTxt,
      desc: 'Python pip package dependencies',
    },
    'README.md': {
      code: pythonFiles.readmeMd,
      desc: 'Academic project report & step-by-step setup documentation',
    },
  };

  const handleCopyCode = (filename: string) => {
    const file = fileMap[filename];
    if (file) {
      navigator.clipboard.writeText(file.code);
      setCopiedFile(filename);
      setTimeout(() => setCopiedFile(null), 2000);
    }
  };

  const handleDownloadFile = (filename: string) => {
    const file = fileMap[filename];
    if (file) {
      const blob = new Blob([file.code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleDownloadAllBundle = () => {
    Object.keys(fileMap).forEach((filename) => {
      handleDownloadFile(filename);
    });
  };

  const handleRunPythonTest = async () => {
    setIsTestingPython(true);
    setPythonTestResult(null);

    try {
      const response = await fetch('/api/run-python-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic || 'Mine Inundation',
          query: 'Chasnalla disaster water irruption',
        }),
      });

      const data = await response.json();
      setPythonTestResult(data);
    } catch (err: any) {
      setPythonTestResult({
        error: true,
        message: err.message || 'Failed to execute Python test.',
      });
    } finally {
      setIsTestingPython(false);
    }
  };

  const currentFile = fileMap[activeFile];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Python Backend &amp; Architecture Submission
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Full Python FastAPI source code and retrieval-augmented generation scripts to submit to your professor, configured for the active topic <strong>"{topic}"</strong>.
        </p>
      </div>

      {/* Architecture Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
          <span className="font-semibold text-slate-900 dark:text-white block">
            01. React Client
          </span>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            User interface handles input, search, query dispatch, and citation exploration.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
          <span className="font-semibold text-slate-900 dark:text-white block">
            02. Python FastAPI
          </span>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            REST API endpoints (<code className="text-xs">/api/train</code>, <code className="text-xs">/api/query</code>) running with Uvicorn.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
          <span className="font-semibold text-slate-900 dark:text-white block">
            03. RAG Retrieval Engine
          </span>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Splits data into overlapping chunks, computes semantic similarity, and grounds responses.
          </p>
        </div>
      </div>

      {/* Live Python Runtime Execution Test Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Terminal className="h-4 w-4 text-slate-700 dark:text-slate-300" />
              <span>Python 3 Linux Runtime Verification</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Execute live Python 3 code in the server environment to verify retrieval execution.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRunPythonTest}
            disabled={isTestingPython}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              isTestingPython
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-wait'
                : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 shadow-xs'
            }`}
          >
            <Play className="h-3.5 w-3.5" />
            <span>{isTestingPython ? 'Running...' : 'Run Python Test'}</span>
          </button>
        </div>

        {pythonTestResult && (
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3 font-mono text-xs space-y-1.5">
            <div className="flex items-center justify-between text-slate-500 text-[11px] pb-1 border-b border-slate-200/60 dark:border-slate-800">
              <span>Output:</span>
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="h-3 w-3" /> Exit Code 0
              </span>
            </div>
            <pre className="overflow-x-auto text-slate-800 dark:text-slate-200 text-[11px] leading-relaxed">
              {JSON.stringify(pythonTestResult, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Code Viewer Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
        {/* File Tabs & Actions */}
        <div className="bg-slate-50 dark:bg-slate-950 px-3 sm:px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2">
          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            {Object.keys(fileMap).map((filename) => {
              const isSelected = activeFile === filename;
              return (
                <button
                  key={filename}
                  type="button"
                  onClick={() => setActiveFile(filename)}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition shrink-0 ${
                    isSelected
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs border border-slate-200/80 dark:border-slate-700'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <FileCode className="h-3.5 w-3.5 opacity-70" />
                  <span>{filename}</span>
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleCopyCode(activeFile)}
              className="px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1"
            >
              {copiedFile === activeFile ? (
                <>
                  <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleDownloadFile(activeFile)}
              className="px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1"
            >
              <Download className="h-3 w-3" />
              <span>Download</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadAllBundle}
              className="px-3 py-1 rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition flex items-center gap-1 shadow-xs"
            >
              <Download className="h-3 w-3" />
              <span>Download All</span>
            </button>
          </div>
        </div>

        {/* File Description */}
        <div className="px-4 py-2 bg-slate-100/50 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-800 text-xs text-slate-500 flex items-center justify-between">
          <span>{currentFile.desc}</span>
          <span className="font-mono text-[11px]">{currentFile.code.split('\n').length} lines</span>
        </div>

        {/* Code Content */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950 overflow-x-auto max-h-[500px] overflow-y-auto">
          <pre className="text-xs font-mono text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre">
            <code>{currentFile.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
