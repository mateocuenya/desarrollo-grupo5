import React, { useState } from 'react';
import { Play, Pause, Plus, Check, Heart } from 'lucide-react'; 
import { useShoppingCart } from '../context/ShoppingCartContext';
import '../styles/Card.css';
import api from '../services/api';

interface Album {
  id: number;
  title: string;
  artist: string;
  cover: string;
  audio: string;
  price: number;
  likes?: number;
}

interface AlbumCardProps {
  album: Album;
  isHovered: boolean;
  onHover: (id: number | null) => void;
  isPlaying: boolean;
  onPlay: (id: number) => void;
  onStop: () => void;
}

const Card: React.FC<AlbumCardProps> = ({
  album,
  isHovered,
  onHover,
  isPlaying,
  onPlay,
  onStop
}) => {
  const { cart, addToCart, removeFromCart } = useShoppingCart();

  const [likes, setLikes] = useState(album.likes || 0);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  const isInCart = cart.some(item => item.id === album.id);
  const isButtonVisible = isPlaying || isHovered;

  const handleToggleCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInCart) {
      removeFromCart(album.id);
    } else {
      addToCart(album);
    }
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();

    setLikes(prev => prev + 1);
    setIsHeartFilled(true);
    setIsPulsing(true); // dispara animación

    try {
      await api.patch(`/tracks/${album.id}/like`);
    } catch (error) {
      console.error('Error al sumar like:', error);
      setLikes(prev => prev - 1);
    } finally {
      setTimeout(() => setIsPulsing(false), 300); // quitar clase de animación
    }
  };

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
        <div className="album-title-row">
          <h4 className="album-title">{album.title}</h4>
          <div 
            className="like-container"
            onClick={handleLike}
            title="Dar like"
          >
            <Heart className={`heart-icon ${isHeartFilled ? 'filled' : ''} ${isPulsing ? 'pulse' : ''}`} />
          </div>
        </div>
        
        <div className="album-details-row">
          <p className="album-artist">{album.artist}</p>
          <div className="album-actions">
            <p className="album-price">${album.price.toFixed(2)}</p>
            <button 
              aria-label={isInCart ? "Quitar del carrito" : "Añadir al carrito"}
              className={`add-to-list-button ${isInCart ? 'added' : ''}`}
              onClick={handleToggleCart}
            >
              {isInCart ? <Check className="add-icon added" /> : <Plus className="add-icon" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
