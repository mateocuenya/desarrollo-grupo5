import { useState, useEffect } from 'react';
import '../styles/HeroSection.css';
import beat from '../assets/vecteezy_abstract-multicolored-sound-wave-pattern-on-black_24025976-ezgif.com-video-to-gif-converter.mp4'; 

interface HeroSectionProps {
  onGoToDjSet: () => void;
}
const carouselImages = [
  {
    id: 1,
    src: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Electronic Vibes',
    subtitle: 'Deep House Collection'
  },
  {
    id: 2,
    src: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Urban Beats',
    subtitle: 'Hip Hop Essentials'
  },
  {
    id: 3,
    src: 'https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Rock Anthems',
    subtitle: 'Classic Rock Hits'
  },
  {
    id: 4,
    src: 'https://images.pexels.com/photos/1616470/pexels-photo-1616470.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Jazz Lounge',
    subtitle: 'Smooth Jazz Selection'
  },
  {
    id: 5,
    src: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Pop Hits',
    subtitle: 'Chart Toppers'
  }
];

export default function HeroSection({ onGoToDjSet }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const getImageStyle = (index: number) => {
    const diff = (index - currentIndex + carouselImages.length) % carouselImages.length;
    if (diff === 0) {
      return { transform: 'translateX(0) scale(1)', opacity: 1, zIndex: 10, filter: 'brightness(1)' };
    } else if (diff === 1) {
      return { transform: 'translateX(60%) scale(0.7)', opacity: 0.6, zIndex: 5, filter: 'brightness(0.7)' };
    } else if (diff === carouselImages.length - 1) {
      return { transform: 'translateX(-60%) scale(0.7)', opacity: 0.6, zIndex: 5, filter: 'brightness(0.7)' };
    } else if (diff === 2) {
      return { transform: 'translateX(80%) scale(0.5)', opacity: 0.3, zIndex: 2, filter: 'brightness(0.5)' };
    } else if (diff === carouselImages.length - 2) {
      return { transform: 'translateX(-80%) scale(0.5)', opacity: 0.3, zIndex: 2, filter: 'brightness(0.5)' };
    } else {
      return { transform: 'translateX(100%) scale(0.3)', opacity: 0, zIndex: 1, filter: 'brightness(0)' };
    }
  };

  return (
    <section className="hero-section">
      <h2 className="section-title">Novedades en Beat's</h2>
      <div className="carousel-container">
        <div className="carousel-track">
          {carouselImages.map((image, index) => (
            <div key={image.id} className="carousel-slide" style={getImageStyle(index)}>
              <img src={image.src} alt={image.title} className="carousel-image" />
              <div className="carousel-overlay">
                <div className="carousel-content">
                  <h3 className="carousel-title">{image.title}</h3>
                  <p className="carousel-subtitle">{image.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="carousel-indicators">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
      <div className="beat-section">
        <div className="button-beat">
          <img src={beat} alt="beat wave" className="beat-gif" />
        </div>

        <div className="beat-legend">
          <h3>Crea tu propio <span>BEAT</span></h3>
          <p>
            Explora nuestra consola, 
            proba ritmos y compone tus propios beats. 
            ¡Conviértete en el DJ de tus ideas y haz que tu música cobre vida!
          </p>
            <button className="dj-view"  onClick={onGoToDjSet}>
            DJ Set
          </button>
        </div>
      </div>
    </section>
  );
}