interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navigation = [
  { id: 'home', label: 'Inicio', icon: '⌂' },
  { id: 'chat', label: 'Chat', icon: '</>' },
  { id: 'sources', label: 'Libros', icon: '◎' },
  { id: 'history', label: 'Historial', icon: '◷' },
  { id: 'settings', label: 'Configuración', icon: '⚙' },
  { id: 'about', label: 'Acerca de', icon: 'i' }
];

export function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="brand-mark">
        <span className="brand-icon">{'{ }'}</span>
        <div>
          <strong>AsistenteProg</strong>
          <small>Aprendizaje guiado</small>
        </div>
      </div>

      <nav className="nav-list" aria-label="Navegación principal">
        {navigation.map((item) => (
          <button
            key={item.id}
            className={activeSection === item.id ? 'nav-item active' : 'nav-item'}
            onClick={() => onNavigate(item.id)}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
