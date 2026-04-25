export type Sender = 'user' | 'assistant';

export type StudentLevel = 'principiante' | 'intermedio' | 'avanzado';

export type ThemeMode = 'light' | 'dark';

export interface ChatMessage {
  id: string;
  sender: Sender;
  content: string;
  createdAt: string;
}

export interface SourceItem {
  id: string;
  title: string;
  description: string;
  notebookUrl: string;
  type: 'NotebookLM' | 'PDF futuro' | 'Documento futuro';
  topic: string;
  createdAt: string;
}

export interface AppSettings {
  theme: ThemeMode;
  studentName: string;
  level: StudentLevel;
  favoriteLanguage: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  accent: string;
}
