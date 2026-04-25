import { FormEvent, useEffect, useRef, useState } from 'react';
import { getAssistantResponse } from '../services/assistantService';
import { AppSettings, ChatMessage } from '../types';
import { MessageBubble } from './MessageBubble';

interface ChatWindowProps {
  messages: ChatMessage[];
  settings: AppSettings;
  draftQuestion: string;
  onDraftQuestionUsed: () => void;
  onMessagesChange: (messages: ChatMessage[]) => void;
  onClear: () => void;
}

const createMessage = (sender: ChatMessage['sender'], content: string): ChatMessage => ({
  id: crypto.randomUUID(),
  sender,
  content,
  createdAt: new Date().toISOString()
});

export function ChatWindow({
  messages,
  settings,
  draftQuestion,
  onDraftQuestionUsed,
  onMessagesChange,
  onClear
}: ChatWindowProps) {
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (draftQuestion) {
      setInputValue(draftQuestion);
      onDraftQuestionUsed();
    }
  }, [draftQuestion, onDraftQuestionUsed]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuestion = inputValue.trim();

    if (!trimmedQuestion || isThinking) {
      return;
    }

    const userMessage = createMessage('user', trimmedQuestion);
    const nextMessages = [...messages, userMessage];
    onMessagesChange(nextMessages);
    setInputValue('');
    setIsThinking(true);

    const assistantContent = await getAssistantResponse(trimmedQuestion, settings);
    const assistantMessage = createMessage('assistant', assistantContent);
    onMessagesChange([...nextMessages, assistantMessage]);
    setIsThinking(false);
  }

  return (
    <section className="panel chat-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Chat educativo</p>
          <h2>Pregunta sobre programación</h2>
        </div>
        <button className="ghost-button" onClick={onClear}>
          Limpiar historial
        </button>
      </div>

      <div className="chat-scroll" aria-live="polite">
        {messages.length === 0 ? (
          <div className="empty-state">
            <strong>Haz tu primera pregunta.</strong>
            <span>Prueba con Python, SQL, algoritmos, JavaScript o POO.</span>
          </div>
        ) : (
          messages.map((message) => <MessageBubble key={message.id} message={message} />)
        )}

        {isThinking && (
          <div className="thinking-indicator">
            <span />
            Analizando pregunta...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Escribe una pregunta, por ejemplo: ¿Qué es un algoritmo?"
          aria-label="Pregunta para el asistente"
        />
        <button className="primary-button" type="submit" disabled={isThinking}>
          Enviar
        </button>
      </form>
    </section>
  );
}
