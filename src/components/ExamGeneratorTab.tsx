import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { DataChunk, ExamQuestion } from '../types';

interface ExamGeneratorTabProps {
  topic: string;
  chunks: DataChunk[];
  onNavigateToIngest: () => void;
}

export const ExamGeneratorTab: React.FC<ExamGeneratorTabProps> = ({
  topic,
  chunks,
  onNavigateToIngest,
}) => {
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGenerateExam = async () => {
    if (chunks.length === 0) {
      setErrorMessage('Please index data first on the "Train Data" tab.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);
    setSelectedAnswers({});
    setIsSubmitted(false);

    try {
      const response = await fetch('/api/generate-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          chunks,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      setQuestions(data.questions || []);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to generate practice exam.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectOption = (qId: number, optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmitExam = () => {
    setIsSubmitted(true);
  };

  const score = questions.filter((q) => selectedAnswers[q.id] === q.correctIndex).length;

  if (chunks.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <BookOpen className="h-10 w-10 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Dataset Required</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
          Please index the DGMS Inundation dataset first to generate verification questions.
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
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Comprehension &amp; Verification Exam
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Test your knowledge and verify model grounding on "{topic}" with questions synthesized directly from the official DGMS records.
          </p>
        </div>

        <button
          type="button"
          onClick={handleGenerateExam}
          disabled={isGenerating}
          className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${
            isGenerating
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-wait'
              : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 shadow-xs'
          }`}
        >
          {isGenerating ? (
            <>
              <RotateCcw className="h-3.5 w-3.5 animate-spin" />
              <span>Generating Exam...</span>
            </>
          ) : (
            <span>{questions.length > 0 ? 'Regenerate Exam' : 'Generate Practice Exam'}</span>
          )}
        </button>
      </div>

      {errorMessage && (
        <p className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 p-3 rounded-lg border border-red-200 dark:border-red-900">
          {errorMessage}
        </p>
      )}

      {/* Questions Form */}
      {questions.length > 0 && (
        <div className="space-y-5">
          {questions.map((q, qIndex) => {
            const userAnswer = selectedAnswers[q.id];
            const isCorrect = userAnswer === q.correctIndex;

            return (
              <div
                key={q.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-4 shadow-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-start gap-2.5">
                    <span className="font-mono text-xs text-slate-500 shrink-0 mt-0.5">
                      0{qIndex + 1}.
                    </span>
                    <span className="leading-snug">{q.question}</span>
                  </h3>

                  {isSubmitted && (
                    <div className="shrink-0 text-xs">
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                          <CheckCircle2 className="h-4 w-4" /> Correct
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-600 dark:text-red-400 font-semibold">
                          <XCircle className="h-4 w-4" /> Incorrect
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAnswer === optIdx;
                    let optionClass =
                      'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700';

                    if (isSubmitted) {
                      if (optIdx === q.correctIndex) {
                        optionClass = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 font-medium';
                      } else if (isSelected && !isCorrect) {
                        optionClass = 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-700 text-red-900 dark:text-red-200';
                      } else {
                        optionClass = 'opacity-50 border-slate-200 dark:border-slate-800 text-slate-400';
                      }
                    } else if (isSelected) {
                      optionClass = 'border-slate-900 dark:border-white bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium ring-1 ring-slate-900/10 dark:ring-white/10';
                    }

                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`p-3 rounded-lg border text-xs cursor-pointer transition flex items-center gap-2.5 ${optionClass}`}
                      >
                        <span className="font-mono text-slate-400 font-medium w-4 shrink-0">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Post-Submit Explanation */}
                {isSubmitted && (
                  <div className="bg-slate-50 dark:bg-slate-950 rounded-lg p-3.5 border border-slate-200/80 dark:border-slate-800 text-xs space-y-1.5">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      <strong className="text-slate-900 dark:text-white">Explanation:</strong> {q.explanation}
                    </p>
                    {q.sourceQuote && (
                      <p className="text-slate-500 text-[11px] italic">
                        Source Reference: "{q.sourceQuote}"
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Bottom Submission Bar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 flex items-center justify-between flex-wrap gap-4 shadow-xs">
            {isSubmitted ? (
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Score: <strong className="text-slate-900 dark:text-white font-mono text-sm">{score} / {questions.length}</strong> ({Math.round((score / questions.length) * 100)}%)
              </div>
            ) : (
              <div className="text-xs text-slate-500">
                Select your answers for all {questions.length} questions.
              </div>
            )}

            <div>
              {isSubmitted ? (
                <button
                  type="button"
                  onClick={handleGenerateExam}
                  className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                >
                  Generate New Exam
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitExam}
                  disabled={Object.keys(selectedAnswers).length < questions.length}
                  className={`px-5 py-2 rounded-lg text-xs font-semibold transition ${
                    Object.keys(selectedAnswers).length < questions.length
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 shadow-xs'
                  }`}
                >
                  Submit &amp; Grade
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
