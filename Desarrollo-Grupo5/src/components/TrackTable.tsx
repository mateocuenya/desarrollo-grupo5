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
  date: string;     // "ADQUIRIDO" o "VENDIDO"
  cover: string;    // URL de la imagen
  bpm?: number | string;
  releaseDate?: string;
}

type TableVariant = 'compras' | 'ventas';

interface TracksTableProps {
  items: UserTrack[];
  variant: TableVariant;

  // 👇 nuevos callbacks
  onPlay?: (id: string) => void;
  onPause?: (id: string) => void;
  onDownload?: (id: string) => void;
  onRemove?: (id: string) => void;
}

const TracksTable: React.FC<TracksTableProps> = ({
  items,
  variant,
  onPlay,
  onPause,
  onDownload,
  onRemove
}) => {
  return (
    <table className="tracks-table">
      <thead>
        <tr>
          <th></th>
          <th>TÍTULO</th>
          <th>ARTISTA/S</th>
          <th>DISCOGRÁFICA</th>
          <th>GÉNERO</th>
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
              <button title="Play" onClick={() => onPlay?.(item.id)}>▶</button>
              <button title="Pausa" onClick={() => onPause?.(item.id)}>⏸</button>
              {variant === 'compras' && (
                <button title="Descargar" onClick={() => onDownload?.(item.id)}>💾</button>
              )}
              <button
                title="Borrar"
                className="remove-button"
                onClick={() => onRemove?.(item.id)}
              >
                🗑
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TracksTable;