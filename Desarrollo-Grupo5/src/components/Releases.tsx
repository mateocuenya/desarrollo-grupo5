import { useState, useMemo } from 'react';
import Cards from './Card';
import '../styles/Releases.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { useTracks } from '../context/TracksContext';

interface Album {
  id: number;
  title: string;
  artist: string;
  cover: string;
  audio: string;
  price: number;
}

const featuredAlbums: Album[] = [
  {
    id: 1,
    title: 'Sweet Nothing',
    artist: 'Calvin Harris',
    cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    price: 1.29
  },
  {
    id: 2,
    title: 'Summer',
    artist: 'Calvin Harris',
    cover: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=400',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    price: 0.99
  },
  {
    id: 3,
    title: 'Blame',
    artist: 'Calvin Harris',
    cover: 'https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg?auto=compress&cs=tinysrgb&w=400',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    price: 1.49
  },
  {
    id: 4,
    title: 'Outside',
    artist: 'Calvin Harris',
    cover: 'https://images.pexels.com/photos/1616470/pexels-photo-1616470.jpeg?auto=compress&cs=tinysrgb&w=400',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    price: 1.29
  }
];

export default function Releases() {
  const { albums } = useTracks();
  const [hoveredAlbum, setHoveredAlbum] = useState<number | null>(null);
  const [playingAlbumId, setPlayingAlbumId] = useState<number | null>(null);
  const { addToCart } = useShoppingCart();

  const allAlbums = [...featuredAlbums, ...albums];

  const currentAudioSrc = useMemo(() => {
    if (!playingAlbumId) return '';
    const album = allAlbums.find(a => a.id === playingAlbumId); 
    return album ? album.audio : '';
  }, [playingAlbumId, allAlbums]);


  const handleStop = () => setPlayingAlbumId(null);

  const handlePlay = (id: number) => {
    if (playingAlbumId === id) {
        setPlayingAlbumId(null);
    } else {
        setPlayingAlbumId(id);
    }
  };

  const handleAddToList = (album: Album) => {
      addToCart(album);
      alert(`"${album.title}" añadida a tu lista.`);
  };

  return (
    <section className="releases-section">
      <h3 className="section-subtitle">Nuevos lanzamientos</h3>
      <div className="albums-grid">
        {allAlbums.map((album) => (
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