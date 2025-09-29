import React from 'react';
import { Play } from 'lucide-react';
import '../styles/Card.css';

interface Album {
  id: number;
  title: string;
  artist: string;
  cover: string;
}

interface AlbumCardProps {
  album: Album;
  isHovered: boolean;
  onHover: (id: number | null) => void;
}

const Card: React.FC<AlbumCardProps> = ({ album, isHovered, onHover }) => {
  return (
    <div
      className="album-card"
      onMouseEnter={() => onHover(album.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="album-cover-container">
        <img
          src={album.cover}
          alt={album.title}
          className="album-cover"
        />
        <div className="album-overlay"></div>
        <div className={`play-button-container ${isHovered ? 'visible' : ''}`}>
          <button className="play-button">
            <Play className="play-icon" />
          </button>
        </div>
      </div>
      <div className="album-info">
        <h4 className="album-title">{album.title}</h4>
        <p className="album-artist">{album.artist}</p>
      </div>
    </div>
  );
};

export default Card;