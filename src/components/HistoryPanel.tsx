import { ChatMessage } from '../types';

interface HistoryPanelProps {
  messages: ChatMessage[];
  onClear: () => void;
}

export function HistoryPanel({ messages, onClear }: HistoryPanelProps) {
  const userQuestions = messages.filter((message) => message.sender === 'user').slice().reverse();

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Historial</p>
          <h2>Preguntas recientes</h2>
        </div>
        <button className="ghost-button" onClick={onClear}>
          Eliminar historial
        </button>
      </div>

      {userQuestions.length === 0 ? (
        <div className="empty-state">
          <strong>Aún no hay preguntas guardadas.</strong>
          <span>El historial se guarda localmente en este navegador.</span>
        </div>
      ) : (
        <div className="history-list">
          {userQuestions.map((question) => (
            <article className="history-item" key={question.id}>
              <span>{question.content}</span>
              <time>{new Date(question.createdAt).toLocaleString('es')}</time>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
