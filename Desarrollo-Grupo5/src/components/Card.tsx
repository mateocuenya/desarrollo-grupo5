import React from 'react';
import { Play, Pause, Plus, Check } from 'lucide-react'; 
import { useShoppingCart } from '../context/ShoppingCartContext';
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
