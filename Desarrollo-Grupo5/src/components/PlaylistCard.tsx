import React from 'react';
import { Play } from 'lucide-react';
import '../styles/PlaylistCard.css';


export interface Playlist {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
}


interface PlaylistCardProps {
    playlist: Playlist;
    onClick: (id: string) => void;
}


const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, onClick }) => {
    return (
        //<button> para que sea clickeable
        <button className="playlist-card" onClick={() => onClick(playlist.id)}>
            <div className="card-image-container">
                <img 
                    src={playlist.imageUrl} 
                    alt={playlist.title} 
                    className="card-image"
                />
                    <div className="card-play-button">
                        <Play size={24} />
                    </div>
            </div>
            <div className="card-info">
                <h3 className="card-title">{playlist.title}</h3>
                <p className="card-description">{playlist.description}</p>
            </div>
        </button>
    );
};

export default PlaylistCard;