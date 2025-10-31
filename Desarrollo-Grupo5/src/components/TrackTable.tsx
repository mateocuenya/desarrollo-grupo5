import React from 'react';
import '../styles/TrackTable.css'; 



export interface UserTrack {
        id: string;
    title: string;
    artist: string;
    recordLabel: string;
    genre: string;
    format: string;
    price: number;
    date: string; // "ADQUIRIDO" o "VENDIDO"
    cover: string; // URL de la imagen
    bpm?: number | string; // Opcional
    releaseDate?: string; // Opcional
}

// --- Tipos de la Tabla ---
type TableVariant = 'compras' | 'ventas';

interface TracksTableProps {
    items: UserTrack[];
    variant: TableVariant;
}

// --- Componente Principal de la Tabla ---
const TracksTable: React.FC<TracksTableProps> = ({ items, variant }) => {

  const handleDownload = (id: string) => {
    console.log("Descargar (no implementado):", id);
  };
  const handleRemove = (id: string) => {
    console.log("Borrar (no implementado):", id);
  };

  return (
    <table className="tracks-table">
      <thead>
        <tr>
          <th></th>
          <th>TÍTULO</th>
          <th>ARTISTA/S</th>
          <th>DISCOGRÁFICA</th>
          <th>GÉNERO</th>
          {/* --- COLUMNAS DINÁMICAS --- */}
          {variant === 'ventas' && (
            <>
              <th>BPM</th>
              <th>LANZADO</th>
            </>
          )}
          <th>FORMATO</th>
          <th>PRECIO</th>
          <th>{variant === 'compras' ? 'ADQUIRIDO' : 'VENDIDO'}</th>
          <th>ACCIONES</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>
              <img src={item.cover} alt={item.title} className="cover-image" />
            </td>
            <td>{item.title}</td>
            <td>{item.artist}</td>
            <td>{item.recordLabel}</td>
            <td>{item.genre}</td>
            
            {/* --- CELDAS DINÁMICAS --- */}
            {variant === 'ventas' && (
              <>
                <td>{item.bpm || 'N/A'}</td>
                <td>{item.releaseDate || 'N/A'}</td>
              </>
            )}

            <td>{item.format}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>{item.date}</td>
            
            <td className="actions-cell">
              <button title="Play">▶️</button>
              <button title="Pausa">⏸️</button>
              {variant === 'compras' && (
                <button onClick={() => handleDownload(item.id)} title="Descargar">
                  💾
                </button>
              )}
              <button onClick={() => handleRemove(item.id)} title="Borrar" className="remove-button">
                🗑️
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TracksTable;