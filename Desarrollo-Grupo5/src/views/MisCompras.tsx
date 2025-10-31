import React, { useState, useEffect } from 'react';
import TracksTable, { type UserTrack } from '../components/TrackTable';
import EmptyState from "../components/EmptyState";
import '../styles/MisCompras.css';

// --- Datos de prueba para que funcione ---
// --- Luego conectar con la API
const mockData: UserTrack[] = [ 
    { 
        id: '1', 
        title: 'Sweet Nothing', 
        artist: 'Calvin Harris', 
        recordLabel: 'Disorder', 
        genre: 'House', 
        format: 'MP3', 
        price: 2.50, 
        date: '07/02/2023', 
        cover: 'https://i.scdn.co/image/ab67616d0000b273b4091a61b8f59d57a43588f1' 
    },
    { 
        id: '2', 
        title: 'Early Morning', 
        artist: 'Guy J', 
        recordLabel: 'UTN Records', 
        genre: 'Progressive House', 
        format: 'MP3', 
        price: 3.60, 
        date: '07/02/2023', 
        cover: 'https://i.scdn.co/image/ab67616d0000b273d4df28e8c1f0b0c03bfb091e' 
    }
];



interface MisComprasProps {
    onBackToHome: () => void;
}

const MisCompras: React.FC<MisComprasProps> = ({ onBackToHome }) => {
    const [compras, setCompras] = useState<UserTrack[]>([]);
    useEffect(() => {
        //Cargar compras reales
        setCompras(mockData);
        //setCompras([]); --> Probar sin compras
    }, []);

    const handleDownloadReport = () => {
        console.log("Descargando informe...");
        // Aquí iría la lógica para generar el informe
    };

    return (
        <div className="page-container">
            <h1 className="page-title">Mis Compras</h1>
            {compras.length === 0 ? (
            <EmptyState 
            message="No tienes compras para visualizar"
            onBackToHome={onBackToHome} // <-- Se la pasamos al EmptyState
                />
            ) : (
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

