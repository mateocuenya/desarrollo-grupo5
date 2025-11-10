import React, { useState, useEffect } from "react";
import TracksTable, { type UserTrack } from "../components/TrackTable";
import EmptyState from "../components/EmptyState";
import "../styles/MisCompras.css";
import api from "../services/api";

interface MisComprasProps {
  onBackToHome: () => void;
}

type AnyObj = Record<string, any>;
const fallbackCover =
  "https://i.scdn.co/image/ab67616d0000b273b4091a61b8f59d57a43588f1";

function toArray(x: any): AnyObj[] {
  if (!x) return [];
  if (Array.isArray(x)) return x;
  if (Array.isArray(x.compras)) return x.compras;
  return [];
}

function fmtDate(d?: string): string {
  if (!d) return "";
  const t = new Date(d);
  return isNaN(t.getTime()) ? d : new Intl.DateTimeFormat("es-AR").format(t);
}

function num(n: any): number {
  const v = Number(n);
  return isNaN(v) ? 0 : v;
}

function toDataUrlIfNeeded(val?: unknown): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") {
    if (val.startsWith("http") || val.startsWith("data:")) return val;
    if (/^[A-Za-z0-9+/=]+$/.test(val)) return `data:image/jpeg;base64,${val}`;
    return val;
  }
  return undefined;
}

function mapCompraYTrack(c: AnyObj, t?: AnyObj): UserTrack {
  const track = t ?? c.track ?? c.Track ?? c.detalleTrack ?? {};

  const title =
    track.nombreTrack ??
    track.titulo ??
    c.nombreTrack ??
    c.titulo ??
    "Sin título";

  const artist =
    track.usuario?.nombreUsuario ??
    track.nombreUsuario ??
    track.artista ??
    track.autor ??
    c.artista ??
    c.autor ??
    "Desconocido";

  const label =
    track.discografica?.nombreDiscografica ??
    track.discografica ??
    track.nombreDiscografica ??
    c.nombreDiscografica ??
    "—";

  const genre =
    track.genero?.nombreGenero ??
    track.genero ??
    c.genero?.nombreGenero ??
    c.genero ??
    "—";

  const format = track.formato ?? track.formatoTrack ?? c.formato ?? "—";

  const price = num(
    c.precioTotal ??
      c.montoCompra ??
      c.monto ??
      c.precio ??
      track.precio ??
      track.precioTrack ??
      0
  );

  const date = fmtDate(
    c.fechaCompra ?? c.fecha ?? c.created_at ?? c.fechaAdquisicion
  );

  const cover =
    track.portadaURL ??
    toDataUrlIfNeeded(track.imagenTrack) ??
    toDataUrlIfNeeded(c.imagenTrack) ??
    fallbackCover;

  const id =
    c.idCompra ?? c.id ?? track.idTrack ?? track.id ?? Math.random();

  return {
    id: String(id),
    title,
    artist,
    recordLabel: label,
    genre,
    format,
    price,
    date,
    cover,
  };
}

// ------ intenta obtener el userId desde LS o desde /auth/me ------
async function getCurrentUserId(): Promise<number | null> {
  const fromLS = Number(localStorage.getItem("userId"));
  if (fromLS) return fromLS;

  try {
    const me = await api.get("/auth/me"); // necesitas este endpoint
    const id =
      Number(me.data?.idUsuario) ||
      Number(me.data?.id) ||
      Number(me.data?.user?.idUsuario) ||
      Number(me.data?.user?.id);
    if (id) {
      localStorage.setItem("userId", String(id));
      return id;
    }
  } catch {
    // si /auth/me falla, devolvemos null
  }
  return null;
}

const MisCompras: React.FC<MisComprasProps> = ({ onBackToHome }) => {
  const [items, setItems] = useState<UserTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setError("");

        const CURRENT_USER_ID = await getCurrentUserId();
        if (!CURRENT_USER_ID) {
          setError("No se encontró el id del usuario. Iniciá sesión.");
          setItems([]);
          return;
        }

        const { data } = await api.get("/compras", {
          params: { idUsuario: CURRENT_USER_ID }, // filtra por comprador
        });

        const compras = toArray(data);

        const results = await Promise.all(
          compras.map(async (c) => {
            const idTrack =
              c.idTrack ?? c.trackId ?? c.Track?.idTrack ?? c.track?.idTrack;
            if (!c.track && !c.Track && idTrack) {
              try {
                const { data: t } = await api.get(`/tracks/${idTrack}`);
                return mapCompraYTrack(c, t);
              } catch {
                return mapCompraYTrack(c);
              }
            }
            return mapCompraYTrack(c);
          })
        );

        setItems(results);
      } catch (e: any) {
        console.error("MisCompras error:", e?.response?.data || e?.message || e);
        const apiMsg =
          e?.response?.data?.error ||
          e?.response?.data?.message ||
          "No se pudieron cargar las compras";
        setError(apiMsg);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDownloadReport = () => {
    console.log("Descargando informe…");
  };

  if (loading) {
    return (
      <div className="page-container">
        <h1 className="page-title">Mis Compras</h1>
        <p>Cargando…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <h1 className="page-title">Mis Compras</h1>
        <p style={{ color: "red" }}>{error}</p>
        <div className="page-actions">
          <button className="btn-secondary" onClick={onBackToHome}>
            Volver a la Página principal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Mis Compras</h1>
      {items.length === 0 ? (
        <EmptyState
          message="No tienes compras para visualizar"
          onBackToHome={onBackToHome}
        />
      ) : (
        <>
          <TracksTable items={items} variant="compras" />
          <div className="page-actions">
            <button className="btn-secondary" onClick={onBackToHome}>
              Volver a la Página principal
            </button>
            <button className="btn-primary" onClick={handleDownloadReport}>
              Descargar informe
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MisCompras;
