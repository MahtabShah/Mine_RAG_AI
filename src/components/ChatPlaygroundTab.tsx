import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  ShieldCheck,
  ShieldAlert,
  Download,
  Trash2,
  ExternalLink,
  X,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { marked } from 'marked';
import { ChatMessage, DataChunk, DatasetAnalysis } from '../types';

interface ChatPlaygroundTabProps {
  topic: string;
  chunks: DataChunk[];
  analysis: DatasetAnalysis | null;
  onNavigateToIngest: () => void;
}

export const ChatPlaygroundTab: React.FC<ChatPlaygroundTabProps> = ({
  topic,
  chunks,
  analysis,
  onNavigateToIngest,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [strictMode, setStrictMode] = useState(true);
  const [activeChunkModal, setActiveChunkModal] = useState<DataChunk | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    if (chunks.length === 0) {
      alert('Please train and index your dataset first on the "Train Data" tab.');
      return;
    }

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic || 'Mine Inundation',
          query,
          chunks,
          strictMode,
          conversationHistory: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || `Server returned ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        text: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citedChunkIndices: data.citedChunkIndices,
        groundingScore: data.groundingScore,
        isOutOfScope: data.isOutOfScope,
        directQuote: data.directQuote,
        followUpQuestions: data.followUpQuestions,
        retrievedChunks: data.retrievedChunks,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        text: `**Query Processing Error**: ${err.message || 'Failed to retrieve answers.'} Please verify that the backend is active.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        groundingScore: 'Out-of-Scope',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleOpenChunkDetails = (chunkIndex: number, retrievedChunks?: DataChunk[]) => {
    const chunk = retrievedChunks?.find((c) => c.index === chunkIndex) || chunks.find((c) => c.index === chunkIndex);
    if (chunk) {
      setActiveChunkModal(chunk);
    }
  };

  const handleExportTranscript = () => {
    if (messages.length === 0) return;
    const header = `# DGMS Inundation Research Q&A Transcript\n**Topic**: ${topic}\n**Total Chunks**: ${chunks.length}\n**Date**: ${new Date().toLocaleString()}\n\n---\n\n`;
    const body = messages
      .map(
        (m) =>
          `### ${m.role === 'user' ? 'Inquiry' : 'DGMS Grounded Assistant'} [${m.timestamp}]\n\n${m.text}\n\n${
            m.directQuote ? `> Direct Excerpt: "${m.directQuote}"\n\n` : ''
          }${m.citedChunkIndices?.length ? `*Citations*: [Chunk ${m.citedChunkIndices.join(', ')}]\n\n` : ''}`
      )
      .join('---\n\n');

    const blob = new Blob([header + body], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dgms_inundation_qa_${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (chunks.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center mx-auto">
          <BookOpen className="h-6 w-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Knowledge Base Not Loaded
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          Load or index the DGMS Inundation records on the Train Data tab to enable query answering.
        </p>
        <button
          onClick={onNavigateToIngest}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition"
        >
          <span>Open Train Data</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  const suggestedQuestions = (analysis?.suggestedQuestions && analysis.suggestedQuestions.length > 0)
    ? analysis.suggestedQuestions
    : [
        'What was the deadliest inundation accident in Indian mining history, and how many died?',
        'What caused the 2020 Khoodia coal mine water inrush and which regulations were violated?',
        'Which Courts of Inquiry were constituted for inundation accidents according to DGMS records?',
        'What is the 60-meter statutory safety barrier rule under Coal Mines Regulations?',
        'Explain the 2017 Sayal D mine water dam failure and the findings.',
        'What happened in the 2016 Turamdih Uranium Project sludge and water irruption?',
      ];

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 flex flex-col h-[calc(100vh-4.25rem)]">
      {/* Control Strip */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200 dark:border-slate-800 text-xs">
        {/* Unboxed Metadata */}
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 truncate">
          <span className="font-semibold text-slate-900 dark:text-white truncate">
            {topic}
          </span>
          <span aria-hidden="true">·</span>
          <span>{chunks.length} Chunks</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setStrictMode(!strictMode)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition ${
              strictMode
                ? 'border-emerald-300 dark:border-emerald-800/80 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
            title="When active, model responds strictly using data from the document."
          >
            {strictMode ? <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> : <ShieldAlert className="h-3.5 w-3.5 text-slate-400" />}
            <span className="hidden sm:inline">Strict Grounding:</span>
            <span>{strictMode ? 'ON' : 'OFF'}</span>
          </button>

          {messages.length > 0 && (
            <>
              <button
                type="button"
                onClick={handleExportTranscript}
                className="p-1.5 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition"
                title="Export Transcript"
                aria-label="Export Markdown Transcript"
              >
                <Download className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setMessages([])}
                className="p-1.5 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-red-950/30 text-slate-600 dark:text-slate-400 hover:text-red-600 transition"
                title="Clear Chat"
                aria-label="Clear chat"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto space-y-5 pr-1 sm:pr-2">
        {messages.length === 0 ? (
          /* Clean Initial State */
          <div className="py-8 sm:py-12 max-w-2xl mx-auto space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                DGMS Inundation &amp; Water Hazard Intelligence
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Query official records on mine water inrush disasters, drowning incidents, judicial Courts of Inquiry, and statutory regulations.
              </p>
            </div>

            {/* Prompt Selector List */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Suggested Research Questions:
              </span>
              <div className="grid grid-cols-1 gap-2">
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(q)}
                    className="p-3 text-left rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 text-xs text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition flex items-center justify-between group shadow-xs"
                  >
                    <span className="leading-snug">{q}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white shrink-0 ml-3" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          messages.map((message) => {
            const isUser = message.role === 'user';
            return (
              <div
                key={message.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
              >
                {/* Meta line without capsules */}
                <div className="flex items-center gap-2 px-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {isUser ? 'Question' : 'DGMS Response'}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{message.timestamp}</span>
                  {!isUser && message.groundingScore && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className={message.groundingScore === 'High' ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-amber-600 dark:text-amber-400 font-medium'}>
                        {message.groundingScore === 'High' ? 'Grounded' : message.groundingScore}
                      </span>
                    </>
                  )}
                </div>

                {/* Message Container */}
                <div
                  className={`max-w-2xl sm:max-w-3xl rounded-xl p-4 sm:p-5 text-sm leading-relaxed border ${
                    isUser
                      ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-transparent shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 shadow-xs'
                  }`}
                >
                  {isUser ? (
                    <p className="whitespace-pre-wrap">{message.text}</p>
                  ) : (
                    <div className="space-y-4">
                      {/* Markdown Response */}
                      <div
                        className="prose text-xs sm:text-sm max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: marked.parse(message.text) as string,
                        }}
                      />

                      {/* Direct Quoted Excerpt */}
                      {message.directQuote && (
                        <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                          <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider block">
                            Direct Source Excerpt
                          </span>
                          <p className="italic leading-relaxed">
                            "{message.directQuote}"
                          </p>
                        </div>
                      )}

                      {/* Citations Footer */}
                      {message.citedChunkIndices && message.citedChunkIndices.length > 0 && (
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center flex-wrap gap-1.5 text-xs">
                          <span className="text-slate-500 dark:text-slate-400 text-[11px] mr-1">
                            Sources:
                          </span>
                          {message.citedChunkIndices.map((idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleOpenChunkDetails(idx, message.retrievedChunks)}
                              className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px] transition inline-flex items-center gap-1 border border-slate-200/60 dark:border-slate-700"
                            >
                              <span>Chunk {idx}</span>
                              <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Follow-up question prompts */}
                      {message.followUpQuestions && message.followUpQuestions.length > 0 && (
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                          <span className="text-[11px] font-semibold text-slate-500 block">
                            Related Inquiries:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {message.followUpQuestions.map((fq, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => handleSendMessage(fq)}
                                className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700/60 transition text-left"
                              >
                                {fq}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-start space-y-1">
            <div className="text-[11px] text-slate-500 px-1">
              Analyzing DGMS records...
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-pulse" />
              <span>Cross-referencing inquiry records and statutory regulations...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Fixed Clean Input Bar */}
      <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1.5 shadow-xs focus-within:border-slate-400 dark:focus-within:border-slate-600 transition"
        >
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask about inundation accidents, regulations, or case studies...`}
            rows={1}
            className="flex-1 bg-transparent border-0 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none resize-none px-3 py-1.5 leading-relaxed"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className={`p-2.5 rounded-lg font-medium text-xs transition flex items-center justify-center shrink-0 min-h-[40px] min-w-[40px] ${
              !inputText.trim() || isLoading
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90'
            }`}
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Chunk Source Preview Modal */}
      {activeChunkModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-2xl w-full p-5 space-y-3 shadow-xl relative max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  Source Chunk #{activeChunkModal.index}
                </span>
                <span aria-hidden="true" className="text-slate-400">·</span>
                <span className="text-slate-600 dark:text-slate-400">
                  {activeChunkModal.sectionHeader || 'DGMS Record'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveChunkModal(null)}
                className="p-1 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <pre className="text-xs font-mono text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-950 p-3.5 rounded-lg border border-slate-200/60 dark:border-slate-800 leading-relaxed whitespace-pre-wrap">
                {activeChunkModal.text}
              </pre>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs text-slate-500">
              <span className="font-mono">{activeChunkModal.wordCount} words · {activeChunkModal.charCount} characters</span>
              <button
                type="button"
                onClick={() => setActiveChunkModal(null)}
                className="px-3 py-1.5 rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium text-xs hover:opacity-90 transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
