import React, { useState, useEffect } from 'react';
import '../styles/Eventos.css';
import { type ViewType } from '../App';

// Definimos la prop que App.tsx nos pasará
interface EventosProps {
  onBackToHome: () => void;
  onViewChange: (view: ViewType) => void; 
}

// Un tipo de dato para un evento
interface Evento {
  id: string;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
}

// Datos de prueba
const mockEventos: Evento[] = [
  { id: 'e1', title: 'Progressive Night', date: '25 NOV 2025', location: 'CABA, Argentina', imageUrl: 'https://i.scdn.co/image/ab67706c0000da8409e0536b1e11c5e638d9f0f9' },
  { id: 'e2', title: 'Melodic Techno Showcase', date: '10 DIC 2025', location: 'Rosario, Argentina', imageUrl: 'https://i.scdn.co/image/ab67706c0000da84f23435160c65e75152864380' },
  { id: 'e3', title: 'Organic House Sunset', date: '15 ENE 2026', location: 'Córdoba, Argentina', imageUrl: 'https://i.scdn.co/image/ab67706c0000da84459f0412809f6b677e50b6a2' },
];

const Eventos: React.FC<EventosProps> = ({ onBackToHome, onViewChange }) => {
  const [eventos, setEventos] = useState<Evento[]>([]);

  useEffect(() => {
    setEventos(mockEventos);
  }, []);

  return (
    <div className="page-container">
      {/* Encabezado con el botón de registrar */}
      <div className="event-header">
        <h1 className="page-title">Próximos Eventos</h1>
      </div>
          <div className='button-zone'>
              <button 
                className="btn-primary header-btn" 
                  onClick={() => onViewChange('registroEvento')} 
              >
                Registrar un Evento
              </button>
          </div>

      {/* --- Lista de Eventos --- */}
      <div className="event-list">
        {eventos.map(evento => (
          <div key={evento.id} className="event-card">
            <img src={evento.imageUrl} alt={evento.title} className="event-image" />
            <div className="event-info">
              <span className="event-date">{evento.date}</span>
              <h3 className="event-title">{evento.title}</h3>
              <span className="event-location">{evento.location}</span>
            </div>
          </div>
        ))}
      </div>

      {/* --- Botón de Volver --- */}
      <div className="page-actions">
        <button className="btn-secondary" onClick={onBackToHome}>
          Volver a la Página principal
        </button>
        <div></div> {/* Espaciador para alinear a la izquierda */}
      </div>
    </div>
  );
};

export default Eventos;