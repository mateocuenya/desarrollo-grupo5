import React from 'react';
import { Play, Pause, Plus } from 'lucide-react'; 
import '../styles/Card.css';

interface Album {
  id: number;
  title: string;
  artist: string;
  cover: string;
  audio: string;
  price: number;
}

interface AlbumCardProps {
  album: Album;
  isHovered: boolean;
  onHover: (id: number | null) => void;
  isPlaying: boolean;
  onPlay: (id: number) => void;
  onStop: () => void;
  onAddToList: () => void; 
}

const Card: React.FC<AlbumCardProps> = ({
  album,
  isHovered,
  onHover,
  isPlaying,
  onPlay,
  onStop,
  onAddToList
}) => {
  const isButtonVisible = isPlaying || isHovered;

  return (
    <div
      className="album-card"
      onMouseEnter={() => onHover(album.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div 
        className={`album-cover-container ${isPlaying ? 'playing' : ''}`}
        onClick={(e) => { 
            e.stopPropagation();
            isPlaying ? onStop() : onPlay(album.id);
        }}
      >
        <img src={album.cover} alt={album.title} className="album-cover" />
        <div className="album-overlay"></div> 

        <div className={`play-button-container ${isButtonVisible ? 'visible' : ''}`}>
          <button
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
            className="play-button"
            onClick={(e) => {
              e.stopPropagation(); 
              isPlaying ? onStop() : onPlay(album.id);
            }}
          >
            {isPlaying ? <Pause className="play-icon" /> : <Play className="play-icon" />}
          </button>
        </div>
      </div>

      <div className="album-info">
        <h4 className="album-title">{album.title}</h4>
        
        <div className="album-details-row">
            <p className="album-artist">{album.artist}</p>
            <div className="album-actions">
                <p className="album-price">${album.price.toFixed(2)}</p>
                <button 
                    aria-label="Añadir a la lista"
                    className="add-to-list-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddToList();
                    }}
                >
                    <Plus className="add-icon" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Card;