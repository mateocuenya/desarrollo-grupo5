import { useState, useEffect } from 'react';
import { Save, FolderOpen } from 'lucide-react';
import { type Theme } from '../lib/supabase';
import '../styles/ThemeManager.css';

interface ThemeManagerProps {
  currentTheme: Theme;
  onLoad: (theme: Theme) => void;
  onSave: () => void;
  onNameChange: (name: string) => void;
}

export function ThemeManager({ currentTheme, onLoad, onSave, onNameChange }: ThemeManagerProps) {
  const [savedThemes, setSavedThemes] = useState<Theme[]>([]);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => { loadThemes(); }, []);

  const loadThemes = () => {
    const stored = localStorage.getItem('djset-themes');
    if (stored) {
      try { setSavedThemes(JSON.parse(stored)); } catch { console.error('Error al leer temas'); }
    }
  };

  const saveThemesToStorage = (themes: Theme[]) => {
    localStorage.setItem('djset-themes', JSON.stringify(themes));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await onSave();
    const newTheme = { ...currentTheme, id: Date.now().toString(), created_at: new Date().toISOString() };
    const updated = [newTheme, ...savedThemes].slice(0,10);
    saveThemesToStorage(updated);
    setSavedThemes(updated);
    setIsSaving(false);
  };

  const handleLoad = (theme: Theme) => {
    onLoad(theme);
    setShowLoadDialog(false);
  };

  return (
    <div className="theme-manager">
      <div className="theme-manager-top">
        <input
          className="theme-name-input"
          type="text"
          value={currentTheme.name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Mi Primer Tema"
        />
        <div className="theme-manager-buttons">
          <button className="theme-button save-button" disabled={isSaving} onClick={handleSave}>
            <Save size={18} /> {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button className="theme-button load-button" onClick={()=>setShowLoadDialog(!showLoadDialog)}>
            <FolderOpen size={18} /> Load
          </button>
        </div>
      </div>

      {showLoadDialog && (
        <div className="saved-themes">
          {savedThemes.length===0 ? <p style={{color:'#9ca3af', fontSize:'12px'}}>No saved themes</p> :
            savedThemes.map(theme => (
              <button key={theme.id} className="saved-theme-button" onClick={()=>handleLoad(theme)}>
                <div style={{fontWeight:600}}>{theme.name}</div>
                <div style={{fontSize:'12px', color:'#d1d5db'}}>
                  {theme.bpm} BPM • {theme.created_at ? new Date(theme.created_at).toLocaleDateString() : ''}
                </div>
              </button>
            ))
          }
        </div>
      )}
    </div>
  );
}
