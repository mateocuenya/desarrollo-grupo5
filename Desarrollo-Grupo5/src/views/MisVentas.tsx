import React, { useState, useEffect } from 'react';
import EmptyState from '../components/EmptyState';
import TracksTable, { type UserTrack } from '../components/TrackTable';
import '../styles/MisVentas.css';


interface MisVentasProps {
    onBackToHome: () => void;
}

// --- Datos de prueba ---
const mockDataVentas: UserTrack[] = [
    { id: '1', title: 'Sweet Nothing', artist: 'Juan Perez', recordLabel: 'Disorder', genre: 'House', bpm: 128, releaseDate: '07/02/2003', format: 'MP3', price: 2.50, date: '07/02/2023', cover: 'https://i.scdn.co/image/ab67616d0000b273b4091a61b8f59d57a43588f1' },
    { id: '2', title: 'Early Morning', artist: 'Juan Perez', recordLabel: 'UTN Records', genre: 'Progressive House', bpm: 125, releaseDate: '07/02/1990', format: 'MP3', price: 3.60, date: '07/02/2023', cover: 'https://i.scdn.co/image/ab67616d0000b273d4df28e8c1f0b0c03bfb091e' }
];

const MisVentas: React.FC<MisVentasProps> = ({ onBackToHome }) => {
    const [ventas, setVentas] = useState<UserTrack[]>([]);

    useEffect(() => {
        // Para probar la tabla llena, descomenta esta línea:
        setVentas(mockDataVentas); 
        // Para probar el estado vacío, deja esta línea:
        // setVentas([]); 
    }, []);

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

