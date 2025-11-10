import React, { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState";
import TracksTable, { type UserTrack } from "../components/TrackTable";
import "../styles/MisVentas.css";
import api from "../services/api";

interface MisVentasProps {
  onBackToHome: () => void;
}

const AUTH_ME_ENDPOINT = "/auth/me"; // <-- ajustá si tu backend usa otra ruta

// helpers
const fallbackCover =
  "https://i.scdn.co/image/ab67616d0000b273b4091a61b8f59d57a43588f1";

const toDataUrlIfNeeded = (val: unknown): string | undefined => {
  if (!val) return undefined;
  if (typeof val === "string") {
    if (val.startsWith("http") || val.startsWith("data:")) return val;
    if (/^[A-Za-z0-9+/=]+$/.test(val)) return `data:image/jpeg;base64,${val}`;
    return val;
  }
  return undefined;
};

const fmtDate = (d?: string): string => {
  if (!d) return "";
  const x = new Date(d);
  return isNaN(x.getTime()) ? d : new Intl.DateTimeFormat("es-AR").format(x);
};

type VentaAPI = any;

function mapVentaToUserTrack(c: VentaAPI): UserTrack {
  const t =
    c.track ??
    c.Track ?? {
      idTrack: c.idTrack,
      nombreTrack: c.nombreTrack,
      artista: c.artista,
      discografica: c.nombreDiscografica,
      genero: c.nombreGenero,
      formato: c.formato,
      portadaURL: c.portadaURL,
      imagenTrack: c.imagenTrack,
      precio: c.precioTrack,
      precioTrack: c.precioTrack,
      fechaLanzamiento: c.fechaLanzamiento,
      bpm: c.bpm,
    };

  const id = String(c.idVenta ?? c.id ?? t.idTrack ?? t.id ?? Math.random());
  const title =
    t.nombreTrack ?? t.titulo ?? c.nombreTrack ?? c.titulo ?? "Sin título";
  const artist =
    t.usuario?.nombreUsuario ?? t.nombreUsuario ?? t.artista ?? "Desconocido";
  const recordLabel =
    t.discografica?.nombreDiscografica ??
    t.discografica ??
    c.nombreDiscografica ??
    "—";
  const genre =
    t.genero?.nombreGenero ?? t.genero ?? c.nombreGenero ?? "—";
  const format = t.formato ?? t.formatoTrack ?? c.formato ?? "—";
  const cover =
    t.portadaURL ??
    toDataUrlIfNeeded(t.imagenTrack) ??
    toDataUrlIfNeeded(c.imagenTrack) ??
    fallbackCover;

  const price = Number(
    c.precioTotal ??
      c.montoVenta ??
      c.monto ??
      c.precio ??
      t.precio ??
      t.precioTrack ??
      0
  );

  const date = fmtDate(
    c.fechaVenta ?? c.fecha ?? c.created_at ?? c.fechaAdquisicion ?? c.fechaOperacion
  );

  const bpm = Number(t.bpm ?? c.bpm ?? 0) || undefined;
  const releaseDate = fmtDate(t.fechaLanzamiento ?? c.fechaLanzamiento) || undefined;

  return {
    id,
    title,
    artist,
    recordLabel,
    genre,
    format,
    price,
    date,
    cover,
    bpm,
    releaseDate,
  };
}

// -------- obtener idUsuario actual con 3 estrategias --------
async function getCurrentUserId(): Promise<number | null> {
  // 1) localStorage
  const fromLS = Number(localStorage.getItem("userId"));
  if (fromLS) return fromLS;

  // 2) JWT (si guardás 'token' en localStorage)
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const [, payloadBase64] = token.split(".");
      const payload = JSON.parse(atob(payloadBase64));
      // ajustá la clave según tu JWT (id, sub, user_id, etc.)
      const fromJwt =
        Number(payload?.id) ||
        Number(payload?.user_id) ||
        Number(payload?.sub);
      if (fromJwt) {
        localStorage.setItem("userId", String(fromJwt));
        return fromJwt;
      }
    } catch {}
  }

  // 3) /auth/me (o el endpoint que tengas)
  try {
    const resp = await api.get(AUTH_ME_ENDPOINT);
    const id =
      Number(resp.data?.idUsuario) ||
      Number(resp.data?.id) ||
      Number(resp.data?.user?.idUsuario) ||
      Number(resp.data?.user?.id);
    if (id) {
      localStorage.setItem("userId", String(id));
      return id;
    }
  } catch {
    // ignoramos; caerá al return null
  }

  return null;
}

const MisVentas: React.FC<MisVentasProps> = ({ onBackToHome }) => {
  const [ventas, setVentas] = useState<UserTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setError("");

        const CURRENT_USER_ID = Number(localStorage.getItem("userId"));
        if (!CURRENT_USER_ID) {
        setError("No se encontró el id del usuario. Iniciá sesión.");
        setVentas([]);
        return;
        }

        const { data } = await api.get("/ventas", {
        params: { idUsuario: CURRENT_USER_ID },
        });


        const arr = Array.isArray(data) ? data : data?.ventas ?? [];
        const mapped = (arr as VentaAPI[]).map(mapVentaToUserTrack);
        setVentas(mapped);
      } catch (e: any) {
        console.error("Error MisVentas:", e?.response?.data || e?.message || e);
        const apiMsg =
          e?.response?.data?.error ||
          e?.response?.data?.message ||
          "No se pudieron cargar las ventas";
        setError(apiMsg);
        setVentas([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <h1 className="page-title">Mis Ventas</h1>
        <p>Cargando…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <h1 className="page-title">Mis Ventas</h1>
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
      <h1 className="page-title">Mis Ventas</h1>

      {ventas.length === 0 ? (
        <EmptyState
          message="No tienes ventas para visualizar"
          onBackToHome={onBackToHome}
        />
      ) : (
        <>
          <TracksTable items={ventas} variant="ventas" />
          <div className="page-actions">
            <button className="btn-secondary" onClick={onBackToHome}>
              Volver a la Página principal
            </button>
            <button className="btn-primary">Descargar informe</button>
          </div>
        </>
      )}
    </div>
  );
};

export default MisVentas;
