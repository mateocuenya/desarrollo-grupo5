import React, { useState, useEffect } from 'react';
import EmptyState from '../components/EmptyState';
import TracksTable, { type UserTrack } from '../components/TrackTable';
import '../styles/MisVentas.css';


interface MisVentasProps {
    onBackToHome: () => void;
}

const MisVentas: React.FC<MisVentasProps> = ({ onBackToHome }) => {
    // --- Estados para manejar la carga de datos ---
    const [ventas, setVentas] = useState<UserTrack[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // --- Carga de datos desde el Backend ---
    useEffect(() => {
        const fetchVentas = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // --- ¡IMPORTANTE! Reemplaza esta URL por la de tu API ---
                const apiUrl = 'http://localhost:5000/api/mis-ventas/1'; 
                
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer 'TuToken'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: No se pudo conectar al servidor`);
                }

                const dataFromBackend = await response.json();

                // --- MAPEO DE DATOS ---
                // Tu API (backend) debe devolver los datos del Track (con JOIN)
                const ventasAdaptadas: UserTrack[] = dataFromBackend.map((venta: any) => ({
                    id: venta.idTrack,
                    title: venta.title,
                    artist: venta.artist,
                    recordLabel: venta.recordLabel,
                    genre: venta.genre,
                    format: venta.format,
                    cover: venta.cover,
                    bpm: venta.bpm,
                    releaseDate: new Date(venta.releaseDate).toLocaleDateString(), // Fecha de lanzamiento (del track)
                    price: venta.price, // Precio del track
                    
                    // --- Campos mapeados ---
                    // 'date' (frontend) usa 'fechaVenta' (backend)
                    date: new Date(venta.fechaVenta).toLocaleDateString(), 
                }));

                setVentas(ventasAdaptadas);

            } catch (err: any) {
                console.error("Error al cargar las ventas:", err);
                setError("No se pudieron cargar tus ventas. Por favor, intenta de nuevo más tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchVentas();
    }, []); // El array vacío [] asegura que esto se ejecute solo una vez

    // 1. Estado de Carga
    if (loading) {
        return (
            <div className="page-container">
                <h1 className="page-title">Cargando...</h1>
            </div>
        );
    }

    // 2. Estado de Error
    if (error) {
        return (
            <div className="page-container">
                <h1 className="page-title" style={{ color: '#ff8a8a' }}>Error al cargar</h1>
                <p style={{ color: 'rgba(255, 255, 255, 0.87)' }}>{error}</p>
                <div className="page-actions">
                    <button className="btn-secondary" onClick={onBackToHome}>
                        Volver a la Página principal
                    </button>
                    <div></div>
                </div>
            </div>
        );
    }

    // 3. Estado Correcto
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
                        <button className="btn-primary">
                            Descargar informe
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default MisVentas;