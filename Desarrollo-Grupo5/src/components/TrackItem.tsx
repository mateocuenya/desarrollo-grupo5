import { useState } from 'react'; 
import { Play, Heart, MoreHorizontal } from 'lucide-react';
import '../styles/TrackItem.css';

interface Track {
  id: number;
  title: string;
  artist: string;
}

interface TrackItemProps {
  track: Track;
  index: number;
  isHovered: boolean;
  onHover: (id: number | null) => void;
}

export default function TrackItem({
  track,
  index,
  isHovered,
  onHover
}: TrackItemProps) {
  const [isLiked, setIsLiked] = useState(false);
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsLiked(prev => !prev);
  };
  return (
    <div
      className={`track-item ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => onHover(track.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="track-number">
        {isHovered ? (
          <Play className="track-play-icon" />
        ) : (
          <span className="track-index">{index + 1}</span>
        )}
      </div>

      <div className="track-info">
        <h4 className="track-title">{track.title}</h4>
        <p className="track-artist">{track.artist}</p>
      </div>

      <div className="track-actions">
        <button 
          className={`track-action-button like-button ${isLiked ? 'liked' : ''}`}
          onClick={handleLikeClick}
        >
          <Heart 
            className="track-action-icon"
            fill={isLiked ? '#ef4444' : 'none'} 
            stroke={isLiked ? '#ef4444' : '#9ca3af'}
          />
        </button>
        <button className="track-action-button">
          <MoreHorizontal className="track-action-icon" />
        </button>
      </div>
    </div>
  );
}