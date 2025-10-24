import React, { useState } from 'react';
import { Music, Image } from 'lucide-react';
import '../styles/Tracks.css';

interface TracksProps {
  onBackToHome: () => void;
}

const Tracks: React.FC<TracksProps> = ({ onBackToHome }) => {
  const [formData, setFormData] = useState({
    title: '',
    bpm: '',
    duration: '',
    discography: '',
    format: '',
    releaseDate: '',
    artistName: '',
    artistLastName: '',
    price: '',
    genre: ''
  });

  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverImage(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    console.log('Audio file:', audioFile);
    console.log('Cover image:', coverImage);
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
              </div>
              <div className="form-group">
                <label>BPM</label>
                <input
                  type="text"
                  value={formData.bpm}
                  onChange={(e) => handleInputChange('bpm', e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Duración</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="form-input"
                  placeholder="mm:ss"
                />
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
              </div>
              <div className="form-group">
                <label>Fecha de lanzamiento</label>
                <input
                  value={formData.releaseDate}
                  onChange={(e) => handleInputChange('releaseDate', e.target.value)}
                  className="form-input"
                >
                </input>
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
              </div>
              <div className="form-group">
                <label>Apellido del autor</label>
                <input
                  type="text"
                  value={formData.artistLastName}
                  onChange={(e) => handleInputChange('artistLastName', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Precio</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className="form-input"
                  placeholder="$0.00"
                />
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