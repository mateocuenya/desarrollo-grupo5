import React, { useState } from 'react';
import { type ViewType } from '../App';
import '../styles/MisCompras.css'; 
import '../styles/Perfil.css'; 
import '../styles/RegistrarEvento.css' 

// Definimos las props
interface RegistroEventoProps {
  onViewChange: (view: ViewType) => void;
}

const RegistroEvento: React.FC<RegistroEventoProps> = ({ onViewChange }) => {
  const [formState, setFormState] = useState({
    title: '',
    date: '',
    location: '',
    imageUrl: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            <input type="text" id="title" name="title" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="date">Fecha (ej. 30 DIC 2025)</label>
            <input type="text" id="date" name="date" onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label htmlFor="location">Ubicación (ej. CABA, Argentina)</label>
            <input type="text" id="location" name="location" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">URL de la Imagen (Flyer)</label>
            <input type="url" id="imageUrl" name="imageUrl" onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Descripción (Opcional)</label>
            <textarea id="description" name="description" rows={4} onChange={handleChange}></textarea>
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