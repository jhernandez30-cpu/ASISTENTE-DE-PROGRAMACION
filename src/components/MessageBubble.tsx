import { ChatMessage } from '../types';

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const time = new Intl.DateTimeFormat('es', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(message.createdAt));

  return (
    <article className={`message-bubble ${message.sender}`}>
      <div className="message-meta">
        <span>{message.sender === 'user' ? 'Tú' : 'Asistente'}</span>
        <time>{time}</time>
      </div>
      <p>{message.content}</p>
    </article>
  );
}
