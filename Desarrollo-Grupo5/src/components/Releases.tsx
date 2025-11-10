import { useState, useEffect, useMemo } from "react";
import Card from "./Card";
import "../styles/Releases.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import api from "../services/api";

const API_ORIGIN = "http://127.0.0.1:5000";


interface Album {
  id: number;
  title: string;
  artist: string;
  cover: string;
  audio: string;
  price: number;
  userId?: number; // 👈 guardamos el idUsuario para completar el nombre
}

function toDataUrlIfNeeded(val: unknown): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") {
    if (val.startsWith("http") || val.startsWith("data:")) return val;
    if (/^[A-Za-z0-9+/=]+$/.test(val)) return `data:image/jpeg;base64,${val}`;
    return val;
  }
  return undefined;
}

function mapTrackToAlbum(track: any): Album {
  const id = track.idTrack ?? track.id ?? 0;
  const title = track.nombreTrack ?? track.titulo ?? "Sin título";

  // Si el back no trae el objeto usuario, vamos a completar luego con userId
  const userId: number | undefined = track.idUsuario ?? track.usuarioId ?? undefined;

  const artist =
    track.usuario?.nombreUsuario ??
    track.nombreUsuario ?? // por si el back ya lo serializa plano
    track.artista ?? 
    "Artista desconocido";

  const cover =
    track.portadaURL ??
    toDataUrlIfNeeded(track.imagenTrack) ??
    "/placeholder.png";

  const rawAudio: string = track.linkAudio ?? track.audioURL ?? "";
  const audio =
    rawAudio
      ? (
          rawAudio.startsWith("/static") || rawAudio.startsWith("/media/")
            ? `${API_ORIGIN}${rawAudio}`              // ej: http://127.0.0.1:5000/static/uploads/audios/loquesea.mp3
            : rawAudio                                // ya viene absoluto
        )
      : "";

  const price = Number(track.precio ?? track.precioTrack ?? 0);

  return { id, title, artist, cover, audio, price, userId };
}

export default function Releases() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [hoveredAlbum, setHoveredAlbum] = useState<number | null>(null);
  const [playingAlbumId, setPlayingAlbumId] = useState<number | null>(null);

  // 1) Traer tracks
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/tracks");
        const baseAlbums: Album[] = (res.data ?? []).map(mapTrackToAlbum);

        // 2) Para los que queden con “Artista desconocido” pero tengan userId,
        //    pedimos /usuarios/:idUsuario y completamos el nombre.
        const needFetch = baseAlbums.filter(
          a => a.artist === "Artista desconocido" && a.userId
        );

        if (needFetch.length === 0) {
          setAlbums(baseAlbums);
          return;
        }

        const lookups = await Promise.all(
          needFetch.map(async a => {
            try {
              const r = await api.get(`/usuarios/${a.userId}`);
              const u = r.data ?? {};
              // Intentamos varios nombres posibles según tu back
              const nombre =
                u.nombreUsuario ??
                u.usuario?.nombreUsuario ??
                (u.nombre && u.apellido ? `${u.nombre} ${u.apellido}` : u.nombre) ??
                "Artista desconocido";
              return { id: a.id, nombre };
            } catch {
              return { id: a.id, nombre: "Artista desconocido" };
            }
          })
        );

        const nameById = new Map<number, string>(
          lookups.map(x => [x.id, x.nombre])
        );

        const completed = baseAlbums.map(a =>
          a.artist !== "Artista desconocido"
            ? a
            : {
                ...a,
                artist: nameById.get(a.id) ?? a.artist,
              }
        );

        setAlbums(completed);
      } catch (err) {
        console.error("Error cargando tracks:", err);
        setAlbums([]);
      }
    })();
  }, []);

  const currentAudioSrc = useMemo(() => {
    if (!playingAlbumId) return "";
    const album = albums.find(a => a.id === playingAlbumId);
    return album ? album.audio : "";
  }, [playingAlbumId, albums]);

  const handleStop = () => setPlayingAlbumId(null);
  const handlePlay = (id: number) =>
    setPlayingAlbumId(prev => (prev === id ? null : id));

  return (
    <section className="releases-section">
      <h3 className="section-subtitle">Nuevos lanzamientos</h3>
      <div className="albums-grid">
        {albums.map(album => (
          <Card
            key={album.id}
            album={album}
            isHovered={hoveredAlbum === album.id}
            onHover={setHoveredAlbum}
            isPlaying={playingAlbumId === album.id}
            onPlay={handlePlay}
            onStop={handleStop}
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
