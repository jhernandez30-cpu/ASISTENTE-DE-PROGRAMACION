import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChatWindow } from './components/ChatWindow';
import { Header } from './components/Header';
import { HistoryPanel } from './components/HistoryPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { Sidebar } from './components/Sidebar';
import { SourceManager } from './components/SourceManager';
import { TopicCards } from './components/TopicCards';
import { storageService } from './services/storageService';
import { AppSettings, ChatMessage, SourceItem } from './types';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [messages, setMessages] = useState<ChatMessage[]>(() => storageService.getMessages());
  const [sources, setSources] = useState<SourceItem[]>(() => storageService.getSources());
  const [settings, setSettings] = useState<AppSettings>(() => storageService.getSettings());
  const [draftQuestion, setDraftQuestion] = useState('');

  useEffect(() => {
    storageService.saveMessages(messages);
  }, [messages]);

  useEffect(() => {
    storageService.saveSources(sources);
  }, [sources]);

  useEffect(() => {
    storageService.saveSettings(settings);
    document.documentElement.dataset.theme = settings.theme;
  }, [settings]);

  const recentQuestionCount = useMemo(
    () => messages.filter((message) => message.sender === 'user').length,
    [messages]
  );

  function clearHistory() {
    setMessages([]);
    storageService.clearMessages();
  }

  const markDraftQuestionUsed = useCallback(() => {
    setDraftQuestion('');
  }, []);

  function askTopic(question: string) {
    setActiveSection('chat');
    setDraftQuestion(question);
  }

  return (
    <div className="app-shell">
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />

      <main className="main-content">
        <Header activeSection={activeSection} onNavigate={setActiveSection} settings={settings} />

        {activeSection === 'home' && (
          <>
            <section className="hero-panel">
              <div className="hero-copy">
                <p className="eyebrow">Aprendizaje asistido con fuentes</p>
                <h2>Asistente de Programacion</h2>
                <p>
                  Aprende programación con apoyo de tus libros y fuentes de estudio. Organiza enlaces de NotebookLM hoy y prepara
                  una arquitectura lista para RAG cuando quieras cargar documentos propios.
                </p>
                <div className="hero-actions">
                  <button className="primary-button" onClick={() => setActiveSection('chat')}>
                    Iniciar chat
                  </button>
                  <button className="ghost-button" onClick={() => setActiveSection('sources')}>
                    Ver libros
                  </button>
                </div>
              </div>

              <div className="hero-stats" aria-label="Resumen de la aplicación">
                <article>
                  <strong>{sources.length}</strong>
                  <span>libros NotebookLM</span>
                </article>
                <article>
                  <strong>{recentQuestionCount}</strong>
                  <span>preguntas recientes</span>
                </article>
                <article>
                  <strong>{settings.favoriteLanguage}</strong>
                  <span>lenguaje favorito</span>
                </article>
              </div>
            </section>

            <TopicCards onAskTopic={askTopic} />
          </>
        )}

        {activeSection === 'chat' && (
          <ChatWindow
            messages={messages}
            settings={settings}
            sources={sources}
            draftQuestion={draftQuestion}
            onDraftQuestionUsed={markDraftQuestionUsed}
            onMessagesChange={setMessages}
            onClear={clearHistory}
          />
        )}

        {activeSection === 'sources' && <SourceManager sources={sources} onSourcesChange={setSources} />}

        {activeSection === 'history' && <HistoryPanel messages={messages} onClear={clearHistory} />}

        {activeSection === 'settings' && <SettingsPanel settings={settings} onSettingsChange={setSettings} />}

        {activeSection === 'about' && (
          <section className="panel about-panel">
            <p className="eyebrow">Acerca de la aplicación</p>
            <h2>Asistente de Programacion</h2>
            <p>
              “Asistente de Programacion es una aplicación educativa diseñada para apoyar el aprendizaje de programación mediante
              explicaciones claras, ejemplos prácticos y fuentes de estudio organizadas.”
            </p>
            <p>
              La integración con NotebookLM se maneja como referencia externa/manual. No usa APIs no oficiales y deja preparada una
              ruta profesional para un backend de IA con recuperación aumentada por generación.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
