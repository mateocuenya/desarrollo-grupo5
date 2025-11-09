import { useState, useEffect, useMemo } from 'react';
import Cards from './Card';
import '../styles/Releases.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useShoppingCart } from '../context/ShoppingCartContext';
import api from '../services/api';

interface Album {
  id: number;
  title: string;
  artist: string;
  cover: string; 
  audio: string;
  price: number;
}

export default function Releases() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [hoveredAlbum, setHoveredAlbum] = useState<number | null>(null);
  const [playingAlbumId, setPlayingAlbumId] = useState<number | null>(null);
  const { addToCart } = useShoppingCart();

  // ------------------ Traer albums del backend ------------------
useEffect(() => {
    api.get('/tracks')
      .then((res) => {
        const mappedAlbums: Album[] = res.data.map((track: any) => ({
        id: track.idTrack,
        title: track.nombreTrack,
        artist: track.discografica?.nombreDiscografica || 'Artista desconocido',
        cover: track.imagenTrack ? `data:image/png;base64,${track.imagenTrack}` : '/placeholder.png',
        audio: track.linkAudio ? `http://127.0.0.1:5000${track.linkAudio}` : '',
        price: track.precioTrack || 0,
      }));
        setAlbums(mappedAlbums);
      })
      .catch(err => console.error('Error cargando tracks:', err));
  }, []);

  const currentAudioSrc = useMemo(() => {
    if (!playingAlbumId) return '';
    const album = albums.find(a => a.id === playingAlbumId); 
    return album ? album.audio : '';
  }, [playingAlbumId, albums]);

  const handleStop = () => setPlayingAlbumId(null);

  const handlePlay = (id: number) => {
    setPlayingAlbumId(prev => prev === id ? null : id);
  };

  const handleAddToList = (album: Album) => {
      addToCart(album);
      alert(`"${album.title}" añadida a tu lista.`);
  };

  return (
    <section className="releases-section">
      <h3 className="section-subtitle">Nuevos lanzamientos</h3>
      <div className="albums-grid">
        {albums.map((album) => (
          <Cards
            key={album.id}
            album={album}
            isHovered={hoveredAlbum === album.id}
            onHover={setHoveredAlbum}
            isPlaying={playingAlbumId === album.id}
            onPlay={handlePlay} 
            onStop={handleStop}
            onAddToList={() => handleAddToList(album)}
          />
        ))}
      </div>
      
      {currentAudioSrc && (
        <AudioPlayer
          src={currentAudioSrc}
          autoPlay
          onEnded={handleStop}
          onPause={handleStop}
          customControlsSection={[]}
          customProgressBarSection={[]}
          customAdditionalControls={[]}
          customVolumeControls={[]}
          className="hidden-audio-player"
        />
      )}
    </section>
  );
}
