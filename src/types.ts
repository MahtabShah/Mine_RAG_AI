export interface DataChunk {
  id: string;
  index: number;
  text: string;
  charCount: number;
  wordCount: number;
  sectionHeader?: string;
}

export interface DatasetStats {
  totalWords: number;
  totalChars: number;
  totalChunks: number;
  avgChunkSize: number;
  domain: string;
  datasetQuality: string;
}

export interface DatasetAnalysis {
  summary: string;
  keyConcepts: string[];
  suggestedQuestions: string[];
  domain: string;
  datasetQuality: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  citedChunkIndices?: number[];
  groundingScore?: 'High' | 'Medium' | 'Out-of-Scope';
  isOutOfScope?: boolean;
  directQuote?: string;
  followUpQuestions?: string[];
  retrievedChunks?: DataChunk[];
}

export interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceQuote: string;
}

export interface PresetDataset {
  id: string;
  title: string;
  topic: string;
  courseCode: string;
  description: string;
  sampleQuestions: string[];
  content: string;
}
