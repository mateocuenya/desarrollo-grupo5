import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/MisTracks.css";

interface Track {
  idTrack: number;
  nombreTrack: string;
  bpm?: number;
  duracion?: string;
  precioTrack?: number;
  formatoTrack?: string;
  fechaLanzamiento?: string;
  imagenTrack?: string;
  linkAudio?: string;
  usuario?: { idUsuario: number };
}

const MisTracks: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [editingTrack, setEditingTrack] = useState<Track | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [nuevoAudio, setNuevoAudio] = useState<File | null>(null);

  useEffect(() => {
    fetchTracks();
  }, []);

const fetchTracks = async () => {
  try {
    const idUsuario = Number(localStorage.getItem("userId"));
    const response = await api.get("/tracks");

    const misTracks = response.data.filter(
      (t: Track) => t.usuario?.idUsuario === idUsuario
    );

    setTracks(misTracks);
  } catch (error) {
    console.error("Error al cargar tracks:", error);
  }
};


  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Seguro que querés eliminar este track?")) return;
    try {
      await api.delete(`/tracks/${id}`);
      alert("✅ Track eliminado correctamente");
      setTracks((prev) => prev.filter((t) => t.idTrack !== id));
    } catch (error) {
      console.error("Error al eliminar track:", error);
      alert("❌ Error al eliminar el track");
    }
  };

  const handleEdit = (track: Track) => {
    setEditingTrack(track);
    setFormData({
      nombreTrack: track.nombreTrack,
      bpm: track.bpm || "",
      duracion: track.duracion || "",
      precioTrack: track.precioTrack || "",
      formatoTrack: track.formatoTrack || "",
      fechaLanzamiento: track.fechaLanzamiento || "",
    });
    setNuevoAudio(null);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && !file.name.endsWith(".mp3")) {
      alert("❌ Solo se permiten archivos .mp3");
      return;
    }
    setNuevoAudio(file || null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTrack) return;

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== undefined && formData[key] !== null) {
        form.append(key, formData[key]);
      }
    });

    if (nuevoAudio) {
    form.append("audio", nuevoAudio);
    }

    try {
      await api.put(`/tracks/${editingTrack.idTrack}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Track actualizado correctamente");
      setEditingTrack(null);
      fetchTracks();
    } catch (error) {
      console.error("Error al actualizar track:", error);
      alert("❌ Error al actualizar el track");
    }
  };

  return (
    <div className="tracks-container">
      <header className="tracks-header">
        <h1 className="tracks-title">🎧 Mis Tracks</h1>
      </header>

      <div className="tracks-content">
        {editingTrack ? (
          <form onSubmit={handleUpdate} className="tracks-form">
            <h3>Editando: {editingTrack.nombreTrack}</h3>

            <div className="form-grid">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombreTrack">Título</label>
                  <input
                    id="nombreTrack"
                    className="form-input"
                    type="text"
                    value={formData.nombreTrack || ""}
                    onChange={(e) =>
                      handleInputChange("nombreTrack", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="bpm">BPM</label>
                  <input
                    id="bpm"
                    className="form-input"
                    type="number"
                    value={formData.bpm || ""}
                    onChange={(e) => handleInputChange("bpm", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="duracion">Duración</label>
                  <input
                    id="duracion"
                    className="form-input"
                    type="text"
                    value={formData.duracion || ""}
                    onChange={(e) =>
                      handleInputChange("duracion", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="precioTrack">Precio</label>
                  <input
                    id="precioTrack"
                    className="form-input"
                    type="number"
                    step="0.01"
                    value={formData.precioTrack || ""}
                    onChange={(e) =>
                      handleInputChange("precioTrack", e.target.value)
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="formatoTrack">Formato</label>
                  <input
                    id="formatoTrack"
                    className="form-input"
                    type="text"
                    value={formData.formatoTrack || ""}
                    onChange={(e) =>
                      handleInputChange("formatoTrack", e.target.value)
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="fechaLanzamiento">Fecha Lanzamiento</label>
                  <input
                    id="fechaLanzamiento"
                    className="form-input"
                    type="date"
                    value={formData.fechaLanzamiento || ""}
                    onChange={(e) =>
                      handleInputChange("fechaLanzamiento", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nuevoAudio">Cambiar audio (opcional)</label>
                  <input
                    id="nuevoAudio"
                    type="file"
                    accept=".mp3"
                    onChange={handleFileChange}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={() => setEditingTrack(null)}
              >
                Cancelar
              </button>
              <button type="submit" className="submit-button">
                Guardar
              </button>
            </div>
          </form>
        ) : (
          <div className="tracks-list">
            {tracks.length === 0 ? (
              <p>No tenés tracks cargados.</p>
            ) : (
              <div className="track-grid">
                {tracks.map((t) => (
                  <div key={t.idTrack} className="track-card">
                    {t.imagenTrack && (
                      <img
                        src={`data:image/jpeg;base64,${t.imagenTrack}`}
                        alt={t.nombreTrack}
                        className="track-cover"
                      />
                    )}
                    <h3>{t.nombreTrack}</h3>
                    <p>
                      BPM: {t.bpm || "-"} | Precio: ${t.precioTrack || 0}
                    </p>
                    <div className="actions">
                      <button
                        className="submit-button"
                        onClick={() => handleEdit(t)}
                      >
                        ✏️ Editar
                      </button>
                      <button
                        className="cancel-button"
                        onClick={() => handleDelete(t.idTrack)}
                      >
                        🗑️ Borrar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MisTracks;
