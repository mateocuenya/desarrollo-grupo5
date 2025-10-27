import React, { useState } from 'react';
import { Music, Image } from 'lucide-react';
import { useTracks } from '../context/TracksContext';
import '../styles/Tracks.css';
import { validateTrackForm, type ValidationErrors } from '../utils/validation';

interface TracksProps {
  onBackToHome: () => void;
}

const Tracks: React.FC<TracksProps> = ({ onBackToHome }) => {
  const { addAlbum } = useTracks();
  const [formData, setFormData] = useState({
    title: '',
    bpm: '',
    duration: '',
    discography: '',
    format: 'MP3',
    releaseDate: '',
    artistName: '',
    artistLastName: '',
    price: '',
    genre: 'Progressive House',
  });

  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<ValidationErrors | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // --- Formateo automático de duración mm:ss ---
  const handleDurationChange = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4); // max 4 dígitos
    const formatted = digits.length <= 2 ? digits : digits.slice(0, 2) + ':' + digits.slice(2);
    handleInputChange('duration', formatted);
  };

  // --- Formateo automático de fecha YYYY-MM-DD ---
  const handleReleaseDateChange = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 8); // max 8 dígitos
    let formatted = '';
    if (digits.length <= 4) formatted = digits;
    else if (digits.length <= 6) formatted = digits.slice(0, 4) + '-' + digits.slice(4);
    else formatted = digits.slice(0, 4) + '-' + digits.slice(4, 6) + '-' + digits.slice(6);
    handleInputChange('releaseDate', formatted);
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAudioFile(file);
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCoverImage(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!audioFile) {
      alert('El audio es obligatorio');
      return;
    }

    const validationErrors = validateTrackForm(formData);
    const hasErrors = Object.values(validationErrors).some(err => err !== null);

    if (hasErrors) {
      setErrors(validationErrors);
      return;
    }

    setErrors(null);

    const newAlbum = {
      id: Date.now(),
      title: formData.title,
      artist: `${formData.artistName} ${formData.artistLastName}`.trim() || 'Desconocido',
      cover: coverImage ? URL.createObjectURL(coverImage) : 'https://via.placeholder.com/400x400.png?text=Sin+Portada',
      audio: URL.createObjectURL(audioFile),
      price: parseFloat(formData.price) || 0.99,
      genre: formData.genre,
    };

    addAlbum(newAlbum);
    alert('Track subido exitosamente 🎶');
    onBackToHome();
  };

  return (
    <div className="tracks-container">
      <div className="tracks-header">
        <h1 className="tracks-title">Tracks</h1>
      </div>

      <div className="tracks-content">
        <form className="tracks-form" onSubmit={handleSubmit}>
          <div className="upload-section">
            <div className="audio-upload">
              <input
                type="file"
                id="audio-upload"
                accept="audio/*"
                onChange={handleAudioUpload}
                className="file-input"
              />
              <label htmlFor="audio-upload" className="upload-label">
                <Music className="upload-icon" />
                <span>{audioFile ? audioFile.name : 'Subir Audio'}</span>
              </label>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-row">
              <div className="form-group">
                <label>Título</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="form-input"
                />
                {errors?.title && <span className="error-message">{errors.title}</span>}
              </div>

              <div className="form-group">
                <label>BPM</label>
                <input
                  type="text"
                  value={formData.bpm}
                  onChange={(e) => handleInputChange('bpm', e.target.value)}
                  className="form-input"
                />
                {errors?.bpm && <span className="error-message">{errors.bpm}</span>}
              </div>

              <div className="form-group">
                <label>Duración</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => handleDurationChange(e.target.value)}
                  placeholder="mm:ss"
                  className="form-input"
                />
                {errors?.duration && <span className="error-message">{errors.duration}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Discográfica</label>
                <input
                  type="text"
                  value={formData.discography}
                  onChange={(e) => handleInputChange('discography', e.target.value)}
                  className="form-input"
                />
                {errors?.discography && <span className="error-message">{errors.discography}</span>}
              </div>

              <div className="form-group">
                <label>Formato</label>
                <select
                  value={formData.format}
                  onChange={(e) => handleInputChange('format', e.target.value)}
                  className="form-select"
                >
                  <option>MP3</option>
                  <option>WAV</option>
                  <option>FLAC</option>
                  <option>AAC</option>
                </select>
                {errors?.format && <span className="error-message">{errors.format}</span>}
              </div>

              <div className="form-group">
                <label>Fecha de lanzamiento</label>
                <input
                  type="text"
                  value={formData.releaseDate}
                  onChange={(e) => handleReleaseDateChange(e.target.value)}
                  placeholder="YYYY-MM-DD"
                  className="form-input"
                />
                {errors?.releaseDate && <span className="error-message">{errors.releaseDate}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group cover-upload-group">
                <label>Portada</label>
                <div className="cover-upload-container">
                  <input
                    type="file"
                    id="cover-upload"
                    accept="image/*"
                    onChange={handleCoverUpload}
                    className="file-input"
                  />
                  <label htmlFor="cover-upload" className="cover-upload-label">
                    {coverImage ? (
                      <div className="cover-preview">
                        <img
                          src={URL.createObjectURL(coverImage)}
                          alt="Cover preview"
                          className="cover-preview-image"
                        />
                      </div>
                    ) : (
                      <div className="cover-placeholder">
                        <Image className="cover-icon" />
                        <span>Agregar portada</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Nombre del autor</label>
                <input
                  type="text"
                  value={formData.artistName}
                  onChange={(e) => handleInputChange('artistName', e.target.value)}
                  className="form-input"
                />
                {errors?.artistName && <span className="error-message">{errors.artistName}</span>}
              </div>

              <div className="form-group">
                <label>Apellido del autor</label>
                <input
                  type="text"
                  value={formData.artistLastName}
                  onChange={(e) => handleInputChange('artistLastName', e.target.value)}
                  className="form-input"
                />
                {errors?.artistLastName && <span className="error-message">{errors.artistLastName}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Precio</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="$0.00"
                  className="form-input"
                />
                {errors?.price && <span className="error-message">{errors.price}</span>}
              </div>

              <div className="form-group">
                <label>Género</label>
                <select
                  value={formData.genre}
                  onChange={(e) => handleInputChange('genre', e.target.value)}
                  className="form-select"
                >
                  <option>Progressive House</option>
                  <option>Deep House</option>
                  <option>Tech House</option>
                  <option>Techno</option>
                  <option>Trance</option>
                  <option>Ambient</option>
                  <option>Drum & Bass</option>
                </select>
                {errors?.genre && <span className="error-message">{errors.genre}</span>}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onBackToHome}>
              Cancelar
            </button>
            <button type="submit" className="submit-button">
              Subir Track
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Tracks;
