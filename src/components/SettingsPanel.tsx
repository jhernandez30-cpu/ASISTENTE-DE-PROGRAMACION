import { AppSettings, StudentLevel, ThemeMode } from '../types';

interface SettingsPanelProps {
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
}

export function SettingsPanel({ settings, onSettingsChange }: SettingsPanelProps) {
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Preferencias</p>
          <h2>Configuración del estudiante</h2>
        </div>
      </div>

      <div className="settings-grid">
        <label>
          Modo visual
          <select
            value={settings.theme}
            onChange={(event) => onSettingsChange({ ...settings, theme: event.target.value as ThemeMode })}
          >
            <option value="dark">Oscuro</option>
            <option value="light">Claro</option>
          </select>
        </label>

        <label>
          Nombre del estudiante
          <input
            value={settings.studentName}
            onChange={(event) => onSettingsChange({ ...settings, studentName: event.target.value })}
            placeholder="Tu nombre"
          />
        </label>

        <label>
          Nivel
          <select
            value={settings.level}
            onChange={(event) => onSettingsChange({ ...settings, level: event.target.value as StudentLevel })}
          >
            <option value="principiante">Principiante</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
          </select>
        </label>

        <label>
          Lenguaje favorito
          <input
            value={settings.favoriteLanguage}
            onChange={(event) => onSettingsChange({ ...settings, favoriteLanguage: event.target.value })}
            placeholder="Python, JavaScript, C#..."
          />
        </label>
      </div>
    </section>
  );
}
