import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DataIngestionTab } from './components/DataIngestionTab';
import { ChatPlaygroundTab } from './components/ChatPlaygroundTab';
import { KnowledgeBaseViewer } from './components/KnowledgeBaseViewer';
import { ExamGeneratorTab } from './components/ExamGeneratorTab';
import { PythonPackageTab } from './components/PythonPackageTab';
import { PRESET_DATASETS } from './data/presets';
import { DataChunk, DatasetAnalysis, DatasetStats } from './types';

export default function App() {
  const initialPreset = PRESET_DATASETS[0];

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('docubrain-theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [activeTab, setActiveTab] = useState<'ingest' | 'chat' | 'knowledge' | 'exam' | 'python'>('chat');
  const [topic, setTopic] = useState<string>(initialPreset.topic);
  const [datasetTitle, setDatasetTitle] = useState<string>(initialPreset.title);
  const [rawText, setRawText] = useState<string>(initialPreset.content);
  const [chunks, setChunks] = useState<DataChunk[]>([]);
  const [stats, setStats] = useState<DatasetStats | null>(null);
  const [analysis, setAnalysis] = useState<DatasetAnalysis | null>(null);

  // Sync theme with document class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('docubrain-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Auto-index default preset on initial load so user can immediately query questions
  useEffect(() => {
    let isMounted = true;
    async function initialIndex() {
      try {
        const response = await fetch('https://mine-rag-api.onrender.com/api/index-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topic: initialPreset.topic,
            title: initialPreset.title,
            dataContent: initialPreset.content,
          }),
        });
        if (response.ok && isMounted) {
          const data = await response.json();
          setChunks(data.chunks || []);
          setStats(data.stats || null);
          setAnalysis(data.analysis || null);
        }
      } catch (e) {
        console.warn('Initial indexing error:', e);
      }
    }

    initialIndex();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleTrainComplete = (
    newChunks: DataChunk[],
    newStats: DatasetStats,
    newAnalysis: DatasetAnalysis
  ) => {
    setChunks(newChunks);
    setStats(newStats);
    setAnalysis(newAnalysis);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors selection:bg-slate-900 selection:text-white dark:selection:bg-white dark:selection:text-slate-900">
      {/* Editorial Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        topic={topic}
        totalChunks={chunks.length}
        isTrained={chunks.length > 0}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Tab View */}
      <main className="flex-1">
        {activeTab === 'chat' && (
          <ChatPlaygroundTab
            topic={topic}
            chunks={chunks}
            analysis={analysis}
            onNavigateToIngest={() => setActiveTab('ingest')}
          />
        )}

        {activeTab === 'ingest' && (
          <DataIngestionTab
            topic={topic}
            setTopic={setTopic}
            datasetTitle={datasetTitle}
            setDatasetTitle={setDatasetTitle}
            rawText={rawText}
            setRawText={setRawText}
            chunks={chunks}
            stats={stats}
            analysis={analysis}
            onTrainComplete={handleTrainComplete}
            onNavigateToChat={() => setActiveTab('chat')}
          />
        )}

        {activeTab === 'knowledge' && (
          <KnowledgeBaseViewer
            topic={topic}
            chunks={chunks}
            stats={stats}
            analysis={analysis}
            onNavigateToIngest={() => setActiveTab('ingest')}
          />
        )}

        {activeTab === 'exam' && (
          <ExamGeneratorTab
            topic={topic}
            chunks={chunks}
            onNavigateToIngest={() => setActiveTab('ingest')}
          />
        )}

        {activeTab === 'python' && (
          <PythonPackageTab
            topic={topic}
            rawText={rawText}
          />
        )}
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-3.5 px-4 sm:px-8 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-700 dark:text-slate-300">
            DocuBrain Intelligence
          </span>
          <span aria-hidden="true">·</span>
          <span>DGMS SANKET Mining Safety Records</span>
          <span aria-hidden="true">·</span>
          <span>FastAPI + RAG Architecture</span>
        </div>
        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
          <button
            type="button"
            onClick={() => setActiveTab('chat')}
            className="hover:text-slate-900 dark:hover:text-white transition"
          >
            Chat
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ingest')}
            className="hover:text-slate-900 dark:hover:text-white transition"
          >
            Dataset
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('knowledge')}
            className="hover:text-slate-900 dark:hover:text-white transition"
          >
            Repository
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('python')}
            className="hover:text-slate-900 dark:hover:text-white font-medium transition"
          >
            Python Source
          </button>
        </div>
      </footer>
    </div>
  );
}
