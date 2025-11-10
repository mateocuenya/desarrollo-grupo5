import React, { useState, useEffect } from 'react';
import '../styles/Eventos.css';
import { type ViewType } from '../App';
import api from '../services/api.ts'; // 👈 usamos tu cliente axios

interface EventosProps {
  onBackToHome: () => void;
  onViewChange: (view: ViewType) => void;
}

/** Tipo que usa TU UI */
interface Evento {
  id: string;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
}

/** Tipo probable que devuelve tu backend (ajustalo si difiere) */
interface EventoAPI {
  idEvento: number;
  nombreEvento: string;
  fechaEvento: string;   // 'YYYY-MM-DD' o ISO
  ciudad?: string;
  provincia?: string;
  recinto?: string;
  imagenEvento?: string; // base64 o URL (si existe)
}

const Eventos: React.FC<EventosProps> = ({ onBackToHome, onViewChange }) => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        // Como configuraste baseURL: "/" y proxy "/eventos",
        // esto llega al backend en http://localhost:5000/eventos
        const { data } = await api.get<EventoAPI[]>("/eventos");

        const adaptados: Evento[] = data.map(mapEventoToUI);
        setEventos(adaptados);
      } catch (e) {
        console.error(e);
        setError("No se pudieron cargar los eventos");
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <h1 className="page-title">Próximos Eventos</h1>
        <p>Cargando eventos…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <h1 className="page-title">Próximos Eventos</h1>
        <p style={{ color: 'red' }}>{error}</p>
        <div className="page-actions">
          <button className="btn-secondary" onClick={onBackToHome}>
            Volver a la Página principal
          </button>
        </div>
      </div>
    );
  }

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
        {eventos.length === 0 ? (
          <p>No hay eventos disponibles</p>
        ) : (
          eventos.map(evento => (
            <div key={evento.id} className="event-card">
              <img src={evento.imageUrl} alt={evento.title} className="event-image" />
              <div className="event-info">
                <span className="event-date">{evento.date}</span>
                <h3 className="event-title">{evento.title}</h3>
                <span className="event-location">{evento.location}</span>
              </div>
            </div>
          ))
        )}
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

/* ---------------- helpers ---------------- */

function mapEventoToUI(e: EventoAPI): Evento {
  const location = [e.ciudad, e.provincia].filter(Boolean).join(", ");
  const fallbackImg = "https://i.scdn.co/image/ab67706c0000da8409e0536b1e11c5e638d9f0f9";

  return {
    id: String(e.idEvento),
    title: e.nombreEvento,
    date: formatearFecha(e.fechaEvento),
    location: location || e.recinto || "Ubicación a confirmar",
    imageUrl: e.imagenEvento || fallbackImg,
  };
}

function formatearFecha(iso: string) {
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    // "25 nov 2025" → lo paso a mayúsculas como tu mock
    return new Intl.DateTimeFormat('es-AR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(d).toUpperCase();
  } catch {
    return iso;
  }
}
