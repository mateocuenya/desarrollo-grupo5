import React, { useState } from 'react';
import { type ViewType } from '../App';
import '../styles/MisCompras.css';
import '../styles/Perfil.css';
import '../styles/RegistrarEvento.css';
import api from '../services/api.ts'; // 👈 tu axios

interface RegistroEventoProps {
  onViewChange: (view: ViewType) => void;
}

// Payload que espera el back (ajustá nombres si tu API usa otros)
interface CreateEventoPayload {
  nombreEvento: string;
  fechaEvento: string;   // YYYY-MM-DD
  ciudad?: string;
  provincia?: string;
  recinto?: string;
  imagenEvento?: string; // si tu back guarda URL, mandamos la URL
  descripcionEvento?: string;
}

const RegistroEvento: React.FC<RegistroEventoProps> = ({ onViewChange }) => {
  const [formState, setFormState] = useState({
    title: '',
    date: '',          // lo pasamos a type="date" → YYYY-MM-DD
    location: '',      // “CABA, Buenos Aires” (lo partimos por coma)
    recinto: '',
    imageUrl: '',
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Adapta "CABA, Buenos Aires" → { ciudad: "CABA", provincia: "Buenos Aires" }
  const parseLocation = (loc: string) => {
    const [ciudadRaw, provinciaRaw] = loc.split(',').map(s => s?.trim());
    return {
      ciudad: ciudadRaw || undefined,
      provincia: provinciaRaw || undefined,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formState.title.trim()) return setError('El nombre es obligatorio');
    if (!formState.date) return setError('La fecha es obligatoria');

    const { ciudad, provincia } = parseLocation(formState.location);

    const payload: CreateEventoPayload = {
      nombreEvento: formState.title.trim(),
      fechaEvento: formState.date,                 // YYYY-MM-DD desde <input type="date" />
      ciudad,
      provincia,
      recinto: formState.recinto?.trim() || undefined,
      imagenEvento: formState.imageUrl?.trim() || undefined,     // si el back espera LONGBLOB/base64, avisame y lo cambiamos
      descripcionEvento: formState.description?.trim() || undefined,
    };

    try {
      setSubmitting(true);
      await api.post('/eventos', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      alert('¡Evento registrado con éxito!');
      onViewChange('eventos'); // Volver a la lista
    } catch (err) {
      console.error(err);
      setError('No se pudo registrar el evento');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Registrar Nuevo Evento</h1>

      <div className="profile-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2>Detalles del Evento</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Nombre del Evento *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formState.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* 👇 usamos date real para que salga YYYY-MM-DD */}
          <div className="form-group">
            <label htmlFor="date">Fecha *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formState.date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Ubicación en una sola línea: “Ciudad, Provincia” */}
          <div className="form-group">
            <label htmlFor="location">Ubicación (Ciudad, Provincia)</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formState.location}
              onChange={handleChange}
              placeholder="CABA, Buenos Aires"
            />
          </div>

          {/* Recinto/Lugar */}
          <div className="form-group">
            <label htmlFor="recinto">Recinto / Lugar</label>
            <input
              type="text"
              id="recinto"
              name="recinto"
              value={formState.recinto}
              onChange={handleChange}
              placeholder="Mandarine Park"
            />
          </div>

          {/* Si tu back guarda URL de imagen, enviamos la URL */}
          <div className="form-group">
            <label htmlFor="imageUrl">URL de la Imagen (Flyer)</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formState.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción (Opcional)</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formState.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-buttons">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => onViewChange('eventos')}
              disabled={submitting}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Guardando...' : 'Registrar Evento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroEvento;
