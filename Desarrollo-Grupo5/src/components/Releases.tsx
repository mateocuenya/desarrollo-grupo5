import { useState } from 'react';
import Cards from './Card';
import '../styles/Releases.css';

interface Album {
  id: number;
  title: string;
  artist: string;
  cover: string;
  audio:string
}

const featuredAlbums: Album[] = [
  {
    id: 1,
    title: 'Sweet Nothing',
    artist: 'Calvin Harris',
    cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: 2,
    title: 'Summer',
    artist: 'Calvin Harris',
    cover: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=400',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: 3,
    title: 'Blame',
    artist: 'Calvin Harris',
    cover: 'https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg?auto=compress&cs=tinysrgb&w=400',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  {
    id: 4,
    title: 'Outside',
    artist: 'Calvin Harris',
    cover: 'https://images.pexels.com/photos/1616470/pexels-photo-1616470.jpeg?auto=compress&cs=tinysrgb&w=400',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
  }
];


export default function Releases(){
const [hoveredAlbum, setHoveredAlbum] = useState<number | null>(null);

  return (
    <section className="releases-section">
      <h3 className="section-subtitle">Nuevos lanzamientos</h3>
      <div className="albums-grid">
        {featuredAlbums.map((album) => (
          <Cards
            key={album.id}
            album={album}
            isHovered={hoveredAlbum === album.id}
            onHover={setHoveredAlbum}
          />
        ))}
      </div>
    </section>
  );
}
