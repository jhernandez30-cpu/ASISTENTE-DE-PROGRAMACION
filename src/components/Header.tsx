import { AppSettings } from '../types';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  settings: AppSettings;
}

export function Header({ activeSection, onNavigate, settings }: HeaderProps) {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">PWA educativa preparada para RAG</p>
        <h1>Asistente de Programacion</h1>
      </div>
      <div className="header-actions">
        <span className="student-pill">
          {settings.studentName || 'Estudiante'} · {settings.level}
        </span>
        <button
          className={activeSection === 'chat' ? 'primary-button' : 'ghost-button'}
          onClick={() => onNavigate('chat')}
        >
          Iniciar chat
        </button>
      </div>
    </header>
  );
}
