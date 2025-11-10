import React, { useState, useEffect } from 'react';
import TracksTable, { type UserTrack } from '../components/TrackTable';
import EmptyState from "../components/EmptyState";
import '../styles/MisCompras.css';

interface MisComprasProps {
    onBackToHome: () => void;
}

const MisCompras: React.FC<MisComprasProps> = ({ onBackToHome }) => {
    // --- Estados para manejar la carga de datos ---
    const [compras, setCompras] = useState<UserTrack[]>([]);
    const [loading, setLoading] = useState(true); // Empieza en 'cargando'
    const [error, setError] = useState<string | null>(null); // Estado para errores

    // --- Carga de datos desde el Backend ---
    useEffect(() => {
        // Función para cargar las compras
        const fetchCompras = async () => {
            try {
                setLoading(true); // Inicia la carga
                setError(null);   // Limpia errores 
                
                // --- Reemplaza esta URL por la de la API ---
                const apiUrl = 'http://localhost:5000/api/mis-compras/1'; // (Ej: /api/mis-compras/id-del-usuario)
                
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Si la API necesita un token de autenticación, agrégar aquí:
                        // 'Authorization': 'Bearer ' + tuTokenDeUsuario
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: No se pudo conectar al servidor`);
                }

                const dataFromBackend = await response.json();

                // --- MAPEO DE DATOS ---
                const comprasAdaptadas: UserTrack[] = dataFromBackend.map((compra: any) => ({
                    id: compra.idTrack, // Asumiendo que idTrack es el id principal
                    title: compra.title, // el backend debe enviar estos datos (usando JOIN)
                    artist: compra.artist,
                    recordLabel: compra.recordLabel,
                    genre: compra.genre,
                    format: compra.format,
                    cover: compra.cover,
                    bpm: compra.bpm,
                    releaseDate: compra.releaseDate,
                    
                    // --- Campos mapeados ---
                    price: compra.montoCompra, // 'price' (frontend) usa 'montoCompra' (backend)
                    date: new Date(compra.fechaCompra).toLocaleDateString(), // 'date' (frontend) usa 'fechaCompra' (backend)
                }));

                setCompras(comprasAdaptadas);

            } catch (err: any) {
                console.error("Error al cargar las compras:", err);
                setError("No se pudieron cargar tus compras. Por favor, intenta de nuevo más tarde.");
            } finally {
                setLoading(false); // Termina la carga de datos (éxito o error)
            }
        };

        fetchCompras();
    }, []); // El array vacío [] asegura que esto se ejecute solo una vez

    // --- Lógica de botones ---
    const handleDownloadReport = () => {
        console.log("Descargando informe...");
        // Aquí iría la lógica para generar el informe
    };

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
                    <div></div> {/* Espaciador */}
                </div>
            </div>
        );
    }

    // 3. Estado Correcto (con o sin compras)
    return (
        <div className="page-container">
            <h1 className="page-title">Mis Compras</h1>
            {compras.length === 0 ? (
                // A. Sin compras
                <EmptyState 
                    message="No tienes compras para visualizar"
                    onBackToHome={onBackToHome}
                />
            ) : (
                // B. Con compras
                <>
                    <TracksTable items={compras} variant="compras" />
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