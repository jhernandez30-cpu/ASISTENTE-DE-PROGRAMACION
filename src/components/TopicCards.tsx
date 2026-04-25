import type { CSSProperties } from 'react';
import { topics } from '../data/topics';

interface TopicCardsProps {
  onAskTopic: (question: string) => void;
}

export function TopicCards({ onAskTopic }: TopicCardsProps) {
  return (
    <section className="topics-grid" aria-label="Temas de programación">
      {topics.map((topic) => (
        <button
          className="topic-card"
          key={topic.id}
          style={{ '--accent': topic.accent } as CSSProperties}
          onClick={() => onAskTopic(`Explícame ${topic.title}`)}
        >
          <span className="topic-dot" />
          <strong>{topic.title}</strong>
          <small>{topic.description}</small>
        </button>
      ))}
    </section>
  );
}
