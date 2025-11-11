import { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/TopTen.css";

interface Track {
  idTrack: number;
  nombreTrack: string;
  usuario: { nombreUsuario: string };
  favoritosTrack: number;
}

export default function TopTen() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await api.get<Track[]>("/tracks");
        const data = response.data;

        const sorted = data.sort(
          (a, b) => (b.favoritosTrack || 0) - (a.favoritosTrack || 0)
        );

        setTracks(sorted.slice(0, 10)); 
      } catch (err) {
        console.error("Error al cargar tracks:", err);
      }
    };

    fetchTracks();
  }, []);

  return (
    <div className="sidebar">
      <div className="top-tracks-card">
        <h3 className="top-tracks-title">
          Beat's <span className="top-tracks-accent">Top10</span>
        </h3>
        <div className="tracks-list">
          {tracks.map((track, index) => (
            <div
              key={track.idTrack}
              className={`track-item ${
                hoveredTrack === track.idTrack ? "hovered" : ""
              }`}
              onMouseEnter={() => setHoveredTrack(track.idTrack)}
              onMouseLeave={() => setHoveredTrack(null)}
            >
              <div className="track-number">{index + 1}</div>
              <div className="track-info">
                <div className="track-name">{track.nombreTrack}</div>
                <div className="track-artist">
                  {track.usuario?.nombreUsuario || "Desconocido"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
