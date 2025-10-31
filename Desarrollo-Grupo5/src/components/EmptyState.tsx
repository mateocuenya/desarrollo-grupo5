import React from 'react';
import "../styles/EmptyState.css";

interface EmptyStateProps {
    message: string;
    onBackToHome: () => void;
}


const EmptyState: React.FC<EmptyStateProps> = ({ message, onBackToHome }) => {
    return (
        <div className="empty-state-container">
            <h2>{message}</h2>
            <button onClick={onBackToHome} className="btn-primary">
                Volver a la Página principal
            </button>
        </div>
    );
};

export default EmptyState;
