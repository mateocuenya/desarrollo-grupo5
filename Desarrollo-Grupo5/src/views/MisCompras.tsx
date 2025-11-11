import React, { useState, useEffect } from "react";
import "../styles/MisCompras.css";

interface UserTrack {
  id: string;
  title: string;
  artist: string;
  recordLabel: string;
  genre: string;
  format: string;
  price: number;
  date: string;
  cover: string;
  audioUrl: string; // URL del archivo de audio
}

interface MisComprasProps {
  onBackToHome: () => void;
}

const MisCompras: React.FC<MisComprasProps> = ({ onBackToHome }) => {
  const [items, setItems] = useState<UserTrack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos carga de datos
    setTimeout(() => {
      const hardcoded: UserTrack[] = [
        {
          id: "1",
          title: "Sweet Nothing",
          artist: "Calvin Harris",
          recordLabel: "Columbia Records",
          genre: "Electrónica / Dance",
          format: "MP3",
          price: 9.99,
          date: "2024-01-10",
          cover:
            "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=100",
          audioUrl: "https://www.example.com/audio/sweet-nothing.mp3",
        },
        {
          id: "2",
          title: "Early Morning",
          artist: "Guy J",
          recordLabel: "Lost & Found",
          genre: "Progressive House",
          format: "WAV",
          price: 7.99,
          date: "2024-01-12",
          cover:
            "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=100",
          audioUrl: "https://www.example.com/audio/early-morning.wav",
        },
        {
          id: "3",
          title: "Midnight City",
          artist: "M83",
          recordLabel: "Mute Records",
          genre: "Synthpop",
          format: "MP3",
          price: 8.49,
          date: "2024-01-15",
          cover:
            "https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg?auto=compress&cs=tinysrgb&w=100",
          audioUrl: "https://www.example.com/audio/midnight-city.mp3",
        },
        {
          id: "4",
          title: "Blinding Lights",
          artist: "The Weeknd",
          recordLabel: "Republic Records",
          genre: "Synthwave",
          format: "MP3",
          price: 10.0,
          date: "2024-02-01",
          cover:
            "https://images.pexels.com/photos/1648791/pexels-photo-1648791.jpeg?auto=compress&cs=tinysrgb&w=100",
          audioUrl: "https://www.example.com/audio/blinding-lights.mp3",
        },
      ];

      setItems(hardcoded);
      setLoading(false);
    }, 800);
  }, []);

  const handleDownload = (track: UserTrack) => {
    const link = document.createElement("a");
    link.href = track.audioUrl;
    link.download = `${track.title} - ${track.artist}.${track.format.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="page-container">
        <h1 className="page-title">Mis Compras</h1>
        <p>Cargando compras...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Mis Compras</h1>

      {items.length === 0 ? (
        <p>No tienes compras disponibles</p>
      ) : (
        <table className="tracks-table compras">
          <thead>
            <tr>
              <th>Portada</th>
              <th>Título</th>
              <th>Artista</th>
              <th>Género</th>
              <th>Formato</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((track) => (
              <tr key={track.id}>
                <td>
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="track-cover-m"
                  />
                </td>
                <td>{track.title}</td>
                <td>{track.artist}</td>
                <td>{track.genre}</td>
                <td>{track.format}</td>
                <td>${track.price}</td>
                <td>
                  <button
                    className="btn-primary"
                    onClick={() => handleDownload(track)}
                  >
                    Descargar audio
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="page-actions">
        <button className="btn-secondary" onClick={onBackToHome}>
          Volver a la Página principal
        </button>
      </div>
    </div>
  );
};

export default MisCompras;
