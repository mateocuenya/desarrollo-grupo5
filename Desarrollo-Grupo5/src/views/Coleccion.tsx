import { useState, useEffect } from 'react';
import PlaylistCard, { type Playlist } from '../components/PlaylistCard';
import '../styles/Coleccion.css'; 


interface ColeccionProps {
  onBackToHome: () => void; // 
}

// --- Datos de prueba ---
const mockPlaylists: Playlist[] = [
  { id: 'p1', title: 'Melodic Techno', description: 'Tracks hipnóticos para la noche.', imageUrl: 'https://i.scdn.co/image/ab67706c0000da84f23435160c65e75152864380' },
  { id: 'p2', title: 'Progressive House', description: 'Viajes sonoros y profundos.', imageUrl: 'https://i.scdn.co/image/ab67706c0000da8409e0536b1e11c5e638d9f0f9' },
  { id: 'p3', title: 'Organic House', description: 'Ritmos relajados y naturales.', imageUrl: 'https://i.scdn.co/image/ab67706c0000da84459f0412809f6b677e50b6a2' },
  { id: 'p4', title: 'Techno', description: 'Sonidos crudos de almacén.', imageUrl: 'https://i.scdn.co/image/ab67706c0000da84f52bfd501ef49f6068303f5d' },
];


const Coleccion = ({ onBackToHome }: ColeccionProps) => { 
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    // Cargamos los datos de prueba
    setPlaylists(mockPlaylists);
  }, []);

  const handlePlaylistClick = (id: string) => {
    console.log("Abriendo playlist:", id);
    // Aquí iría la lógica para navegar a una vista de playlist individual
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Mi Colección</h1>

      {/* --- Contenedor de la Cuadrícula --- */}
      <div className="playlist-grid">
        {playlists.map(playlist => (
          <PlaylistCard 
            key={playlist.id} 
            playlist={playlist} 
            onClick={handlePlaylistClick} 
          />
        ))}
      </div>

      {/* --- BOTÓN DE VOLVER --- */}
      <div className="page-actions">
        <button className="btn-secondary" onClick={onBackToHome}>
          Volver a la Página principal
        </button>
        <div></div> 
      </div>

    </div>
  );
};

export default Coleccion;


