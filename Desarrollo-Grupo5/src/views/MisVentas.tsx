import React, { useState, useEffect } from "react";
import "../styles/MisVentas.css";

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
}

interface MisVentasProps {
  onBackToHome: () => void;
}

const MisVentas: React.FC<MisVentasProps> = ({ onBackToHome }) => {
  const [ventas, setVentas] = useState<UserTrack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const ARTISTA = "DJ Example"; // mismo artista para todas las canciones

      const hardcoded: UserTrack[] = [
        {
          id: "1",
          title: "Starlight",
          artist: ARTISTA,
          recordLabel: "Warner Bros",
          genre: "Rock",
          format: "MP3",
          price: 12.5,
          date: "2024-03-10",
          cover: "https://images.pexels.com/photos/1648790/pexels-photo-1648790.jpeg?auto=compress&cs=tinysrgb&w=100",
        },
        {
          id: "2",
          title: "Ocean Drive",
          artist: ARTISTA,
          recordLabel: "Blase Boys Club",
          genre: "House",
          format: "WAV",
          price: 9.0,
          date: "2024-03-12",
          cover: "https://images.pexels.com/photos/1763074/pexels-photo-1763074.jpeg?auto=compress&cs=tinysrgb&w=100",
        },
        {
          id: "3",
          title: "Firestone",
          artist: ARTISTA,
          recordLabel: "Sony Music",
          genre: "Tropical House",
          format: "MP3",
          price: 11.0,
          date: "2024-03-15",
          cover: "https://images.pexels.com/photos/2479313/pexels-photo-2479313.jpeg?auto=compress&cs=tinysrgb&w=100",
        },
      ];
      setVentas(hardcoded);
      setLoading(false);
    }, 800);
  }, []);

  const totalRecaudado = ventas.reduce((sum, v) => sum + v.price, 0);

  if (loading) {
    return (
      <div className="page-container">
        <h1 className="page-title">Mis Ventas</h1>
        <p>Cargando ventas...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Mis Ventas</h1>

      {ventas.length === 0 ? (
        <p>No tienes ventas disponibles</p>
      ) : (
        <>
          <table className="tracks-table ventas">
            <thead>
              <tr>
                <th>Portada</th>
                <th>Título</th>
                <th>Artista</th>
                <th>Género</th>
                <th>Formato</th>
                <th>Precio</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((track) => (
                <tr key={track.id}>
                  <td>
                    <img src={track.cover} alt={track.title} className="track-cover-m" />
                  </td>
                  <td>{track.title}</td>
                  <td>{track.artist}</td>
                  <td>{track.genre}</td>
                  <td>{track.format}</td>
                  <td>${track.price.toFixed(2)}</td>
                  <td>{track.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="total-recaudado">
            <strong>Total recaudado:</strong> ${totalRecaudado.toFixed(2)}
          </div>

          <div className="page-actions">
            <button className="btn-secondary" onClick={onBackToHome}>
              Volver a la Página principal
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MisVentas;
