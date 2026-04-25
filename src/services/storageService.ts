import { AppSettings, ChatMessage, SourceItem } from '../types';
import { sampleSources } from '../data/sampleSources';

const CHAT_KEY = 'asistente-programacion:chat';
const SOURCES_KEY = 'asistente-programacion:sources';
const SETTINGS_KEY = 'asistente-programacion:settings';

export const defaultSettings: AppSettings = {
  theme: 'dark',
  studentName: '',
  level: 'principiante',
  favoriteLanguage: 'Python'
};

function readJson<T>(key: string, fallback: T): T {
  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? (JSON.parse(rawValue) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function normalizeSources(sources: SourceItem[]): SourceItem[] {
  const normalizedSources = sources.map((source) => ({
    ...source,
    description: source.description || 'Fuente NotebookLM registrada para estudiar programacion.',
    topic: source.topic || source.title.toLowerCase()
  }));
  const missingDefaultSources = sampleSources.filter(
    (sampleSource) => !normalizedSources.some((source) => source.id === sampleSource.id)
  );

  return [...missingDefaultSources, ...normalizedSources];
}

export const storageService = {
  getMessages(): ChatMessage[] {
    return readJson<ChatMessage[]>(CHAT_KEY, []);
  },

  saveMessages(messages: ChatMessage[]): void {
    writeJson(CHAT_KEY, messages);
  },

  clearMessages(): void {
    window.localStorage.removeItem(CHAT_KEY);
  },

  getSources(): SourceItem[] {
    return normalizeSources(readJson<SourceItem[]>(SOURCES_KEY, sampleSources));
  },

  saveSources(sources: SourceItem[]): void {
    writeJson(SOURCES_KEY, sources);
  },

  getSettings(): AppSettings {
    return readJson<AppSettings>(SETTINGS_KEY, defaultSettings);
  },

  saveSettings(settings: AppSettings): void {
    writeJson(SETTINGS_KEY, settings);
  }
};
