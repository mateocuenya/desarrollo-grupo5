import React, { useState } from 'react';
import { type ViewType } from '../App';
import '../styles/MisCompras.css'; 
import '../styles/Perfil.css'; 
import '../styles/RegistrarEvento.css';


interface RegistroEventoProps {
  onViewChange: (view: ViewType) => void;
}

const RegistroEvento: React.FC<RegistroEventoProps> = ({ onViewChange }) => {
  const [formState, setFormState] = useState({
    title: '',
    date: '',
    horario: '',
    ubicacion: '', // <-- Dejar vacío para el placeholder
    imageUrl: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Evento registrado:", formState);
    // Aquí iría la lógica de API para enviar el evento
    
    // Mostramos un alert y volvemos
    alert("¡Evento registrado con éxito!");
    onViewChange('eventos'); // Volvemos a la lista de eventos
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Registrar Nuevo Evento</h1>

      {/* Reutilizamos la tarjeta de Perfil para el formulario */}
      <div className="profile-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2>Detalles del Evento</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="title">Nombre del Evento</label>
            <input type="text" id="title" name="title" value={formState.title} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="date">Fecha (ej. 30 DIC 2025)</label>
            <input type="text" id="date" name="date" value={formState.date} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label htmlFor="horario">Hora (ej. 12:00hs)</label>
            <input type="text" id="horario" name="horario" value={formState.horario} onChange={handleChange} required />
          </div>

          {/* --- Reemplazamos el Input por un Select --- */}
          <div className="form-group">
            <label htmlFor="ubicacion">Ubicación</label>
            <select 
              id="ubicacion" 
              name="ubicacion" 
              value={formState.ubicacion} /* Controlamos el valor */
              onChange={handleChange} 
              required
            >
              {/* Placeholder deshabilitado */}
              <option value="" disabled>Selecciona una ubicación</option>
              
              {/* Opciones (el 'value' es lo que envías al backend) */}
              <option value="1">CABA, Argentina</option>  
              <option value="2">Rosario, Argentina</option>
              <option value="3">Córdoba, Argentina</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">URL de la Imagen (Flyer)</label>
            <input type="url" id="imageUrl" name="imageUrl" value={formState.imageUrl} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Descripción (Opcional)</label>
            <textarea id="description" name="description" value={formState.description} rows={4} onChange={handleChange}></textarea>
          </div>

          {/* Botones de acción */}
          <div className="form-buttons">
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={() => onViewChange('eventos')}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              Registrar Evento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroEvento;

