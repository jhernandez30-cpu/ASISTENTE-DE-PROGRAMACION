import { FormEvent, useState } from 'react';
import { sampleSources } from '../data/sampleSources';
import { SourceItem } from '../types';

interface SourceManagerProps {
  sources: SourceItem[];
  onSourcesChange: (sources: SourceItem[]) => void;
}

export function SourceManager({ sources, onSourcesChange }: SourceManagerProps) {
  const [title, setTitle] = useState('');
  const [notebookUrl, setNotebookUrl] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !notebookUrl.trim()) {
      return;
    }

    const source: SourceItem = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: 'Fuente NotebookLM agregada manualmente por el estudiante.',
      notebookUrl: notebookUrl.trim(),
      type: 'NotebookLM',
      topic: title.trim().toLowerCase(),
      createdAt: new Date().toISOString()
    };

    onSourcesChange([source, ...sources]);
    setTitle('');
    setNotebookUrl('');
  }

  function handleRemove(id: string) {
    onSourcesChange(sources.filter((source) => source.id !== id));
  }

  function restoreNotebookBooks() {
    const customSources = sources.filter(
      (source) => !sampleSources.some((sampleSource) => sampleSource.id === source.id)
    );
    onSourcesChange([...sampleSources, ...customSources]);
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Cerebro de la aplicacion</p>
          <h2>Libros NotebookLM</h2>
        </div>
        <button className="ghost-button" onClick={restoreNotebookBooks}>
          Restaurar libros base
        </button>
      </div>

      <p className="section-description">
        Estos notebooks son la base conceptual del asistente. La app no usa una API no oficial de NotebookLM: abre los libros como
        recursos externos confiables y deja preparada la arquitectura para un futuro RAG propio.
      </p>

      <div className="featured-book">
        <div className="card-icon">IA</div>
        <div>
          <h3>Asistente de Programacion</h3>
          <p>Aplicacion guiada para aprender programacion con rutas, ejercicios, quiz y recomendaciones basadas en estos libros.</p>
        </div>
      </div>

      <div className="source-layout">
        <form className="source-form" onSubmit={handleSubmit}>
          <label>
            Nombre del libro o documento
            <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Ej. Libro JavaScript" />
          </label>
          <label>
            Enlace de NotebookLM
            <input
              value={notebookUrl}
              onChange={(event) => setNotebookUrl(event.target.value)}
              placeholder="https://notebooklm.google.com/notebook/..."
            />
          </label>
          <button className="primary-button" type="submit">
            Agregar libro
          </button>
        </form>

        <div className="rag-ready-box">
          <strong>Preparado para modo profesional RAG</strong>
          <p>
            NotebookLM funciona como biblioteca externa/manual. En el futuro, estos mismos contenidos podrian cargarse como PDF, TXT,
            MD o DOCX para indexarlos y responder desde una base de conocimiento propia.
          </p>
          <div className="upload-placeholder">
            Carga de documentos proximamente: PDF · TXT · MD · DOCX
          </div>
        </div>
      </div>

      <div className="books-grid">
        {sources.map((source) => (
          <article className="book-card" key={source.id}>
            <div className="card-icon">{source.topic === 'n8n' ? 'BOT' : 'LIB'}</div>
            <div>
              <strong>{source.title}</strong>
              <p>{source.description}</p>
              <a href={source.notebookUrl} target="_blank" rel="noreferrer">
                Abrir Libro →
              </a>
            </div>
            <button className="icon-button" onClick={() => handleRemove(source.id)} aria-label={`Eliminar ${source.title}`}>
              ×
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
