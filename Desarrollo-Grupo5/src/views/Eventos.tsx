import React, { useState } from 'react';
import { Upload, Image, Video, Music, Calendar, MapPin, X } from 'lucide-react';
import '../styles/Eventos.css';

interface EventsProps {
  onBackToHome: () => void;
  onBackToEvent:() => void;
  onEventSubmit: (eventData: any, mediaFile: File) => void;
}

interface PurchasedTrack {
  id: number;
  title: string;
  artist: string;
  cover: string;
}

const purchasedTracks: PurchasedTrack[] = [
  {
    id: 1,
    title: 'Sweet Nothing',
    artist: 'Calvin Harris',
    cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 2,
    title: 'Early Morning',
    artist: 'Guy J',
    cover: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 3,
    title: 'Midnight City',
    artist: 'M83',
    cover: 'https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

const Events: React.FC<EventsProps> = ({ onBackToEvent, onEventSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    eventDate: '',
    selectedTrack: '',
    eventType: 'Fiesta'
  });

  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (50MB max)
      if (file.size > 50 * 1024 * 1024) {
        alert('El archivo es demasiado grande. Máximo 50MB permitido.');
        return;
      }

      // Validate file type
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      if (!isImage && !isVideo) {
        alert('Solo se permiten archivos de imagen o video.');
        return;
      }

      setMediaFile(file);
      setMediaType(isImage ? 'image' : 'video');
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setMediaPreview(previewUrl);
    }
  };

  const removeMedia = () => {
    if (mediaPreview) {
      URL.revokeObjectURL(mediaPreview);
    }
    setMediaFile(null);
    setMediaPreview(null);
    setMediaType(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.selectedTrack || !mediaFile) {
      alert('Por favor completa todos los campos obligatorios y sube un archivo multimedia.');
      return;
    }

    // Call the parent function to handle the event submission
    onEventSubmit(formData, mediaFile);
    alert('¡Evento compartido exitosamente! Ahora aparecerá en el feed de eventos.');
  };

  const getFileSizeString = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="events-container">
      <div className="events-header">
        <h1 className="events-title">Compartir Evento</h1>
        <p className="events-subtitle">
          Comparte fotos y videos de tus eventos donde usaste música adquirida
        </p>
      </div>

      <div className="events-content">
        <form className="events-form" onSubmit={handleSubmit}>
          {/* Media Upload Section */}
          <div className="upload-section">
            <div className="media-upload">
              <input
                type="file"
                id="media-upload"
                accept="image/*,video/*"
                onChange={handleMediaUpload}
                className="file-input"
              />
              {!mediaFile ? (
                <label htmlFor="media-upload" className="upload-label">
                  <div className="upload-content">
                    <div className="upload-icons">
                      <Image className="upload-icon" />
                      <Video className="upload-icon" />
                    </div>
                    <span className="upload-text">Subir Foto o Video</span>
                    <span className="upload-hint">Máximo 50MB - Formatos: JPG, PNG, MP4, MOV</span>
                  </div>
                </label>
              ) : (
                <div className="media-preview">
                  <button type="button" className="remove-media" onClick={removeMedia}>
                    <X className="remove-icon" />
                  </button>
                  {mediaType === 'image' ? (
                    <img src={mediaPreview!} alt="Preview" className="preview-image" />
                  ) : (
                    <video src={mediaPreview!} className="preview-video" controls />
                  )}
                  <div className="media-info">
                    <span className="media-name">{mediaFile.name}</span>
                    <span className="media-size">{getFileSizeString(mediaFile.size)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="form-grid">
            {/* Row 1 */}
            <div className="form-row">
              <div className="form-group">
                <label>Título del Evento *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="form-input"
                  placeholder="Ej: Fiesta electrónica en Mar del Plata"
                  required
                />
              </div>
              <div className="form-group">
                <label>Tipo de Evento</label>
                <select
                  value={formData.eventType}
                  onChange={(e) => handleInputChange('eventType', e.target.value)}
                  className="form-select"
                >
                  <option>Fiesta</option>
                  <option>Club</option>
                  <option>Festival</option>
                  <option>Boda</option>
                  <option>Evento Corporativo</option>
                  <option>Evento Privado</option>
                  <option>Otro</option>
                </select>
              </div>
            </div>

            {/* Row 2 */}
            <div className="form-row">
              <div className="form-group">
                <label>Ubicación</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="form-input"
                  placeholder="Ciudad, País"
                />
              </div>
              <div className="form-group">
                <label>Fecha del Evento</label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => handleInputChange('eventDate', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            {/* Row 3 - Track Selection */}
            <div className="form-row">
              <div className="form-group full-width">
                <label>Canción Utilizada *</label>
                <select
                  value={formData.selectedTrack}
                  onChange={(e) => handleInputChange('selectedTrack', e.target.value)}
                  className="form-select track-select"
                  required
                >
                  <option value="">Selecciona una canción de tu biblioteca</option>
                  {purchasedTracks.map((track) => (
                    <option key={track.id} value={track.id}>
                      {track.title} - {track.artist}
                    </option>
                  ))}
                </select>
                {formData.selectedTrack && (
                  <div className="selected-track">
                    {(() => {
                      const track = purchasedTracks.find(t => t.id.toString() === formData.selectedTrack);
                      return track ? (
                        <div className="track-info">
                          <img src={track.cover} alt={track.title} className="track-cover" />
                          <div className="track-details">
                            <span className="track-title">{track.title}</span>
                            <span className="track-artist">{track.artist}</span>
                          </div>
                          <Music className="music-icon" />
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>
            </div>

            {/* Row 4 - Description */}
            <div className="form-row">
              <div className="form-group full-width">
                <label>Descripción del Evento</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="form-textarea"
                  placeholder="Describe tu evento, la experiencia, el ambiente..."
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="submit" className="submit-button">
              Compartir Evento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Events;