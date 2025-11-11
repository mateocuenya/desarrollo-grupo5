import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Play, MapPin, Calendar, Music } from 'lucide-react';
import '../styles/Feed.css';

interface EventPost {
  id: number;
  title: string;
  description: string;
  location: string;
  eventDate: string;
  eventType: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  track: {
    id: number;
    title: string;
    artist: string;
    cover: string;
  };
  user: {
    name: string;
  };
  likes: number;
  comments: number;
  isLiked: boolean;
  createdAt: string;
}

interface EventsFeedProps {
  eventPosts: EventPost[];
  onUpdatePosts: (posts: EventPost[]) => void;
  onShareEvent: () => void;
}

const Feed: React.FC<EventsFeedProps> = ({ eventPosts, onShareEvent }) => {

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'hace 1 día';
    if (diffDays < 7) return `hace ${diffDays} días`;
    if (diffDays < 30) return `hace ${Math.floor(diffDays / 7)} semanas`;
    return `hace ${Math.floor(diffDays / 30)} meses`;
  };

  return (
    <div className="events-feed-container">
      <div className="events-feed-header">
        <h1 className="events-feed-title">Feed de Eventos</h1>
        <p className="events-feed-subtitle">
          Descubre cómo otros DJs y productores usan la música en sus eventos
        </p>
      </div>

      <div className="events-feed-content">
        <div className="posts-container">
          {eventPosts.map((post) => (
            <article key={post.id} className="event-post">
              <div className="post-header">
                <div className="user-info">
                  <div className="user-details">
                    <h3 className="user-name-f">{post.user.name}</h3>
                    <span className="post-time">{getTimeAgo(post.createdAt)}</span>
                  </div>
                </div>
                <div className="event-type-badge">
                  {post.eventType}
                </div>
              </div>

              {/* Post Content */}
              <div className="post-content">
                <h2 className="post-title">{post.title}</h2>
                <div className="event-details">
                  {post.location && (
                    <div className="event-detail">
                      <MapPin className="detail-icon" />
                      <span>{post.location}</span>
                    </div>
                  )}
                  <div className="event-detail">
                    <Calendar className="detail-icon" />
                    <span>{formatDate(post.eventDate)}</span>
                  </div>
                </div>

                {/* Media */}
                <div className="post-media">
                  {post.mediaType === 'image' ? (
                    <img src={post.mediaUrl} alt={post.title} className="post-image" />
                  ) : (
                    <video src={post.mediaUrl} className="post-video" controls />
                  )}
                </div>

                {post.description && (
                  <p className="post-description">{post.description}</p>
                )}

                <div className="track-used-f">
                  <div className="track-label-f">
                    <Music className="music-icon-f" />
                    <span>Canción utilizada:</span>
                  </div>
                  <div className="track-info-f">
                    <img src={post.track.cover} alt={post.track.title} className="track-cover-f" />
                    <div className="track-details-f">
                      <span className="track-title-f">{post.track.title}</span>
                      <span className="track-artist-f">{post.track.artist}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="feed-sidebar">
          <div className="sidebar-card">
            <h3 className="sidebar-title">Comparte tu evento</h3>
            <p className="sidebar-description">
              ¿Usaste música de Beat's en tu evento? ¡Compártelo con la comunidad!
            </p>
            <button className="share-event-btn" onClick={onShareEvent}>
              Compartir Evento
            </button>
          </div>

          <div className="sidebar-card">
            <h3 className="sidebar-title">Eventos populares</h3>
            <div className="popular-events">
              <div className="popular-event">
                <span className="event-name">Fiestas electrónicas</span>
                <span className="event-count">{eventPosts.filter(p => p.eventType === 'Fiesta').length} eventos</span>
              </div>
              <div className="popular-event">
                <span className="event-name">Sets de club</span>
                <span className="event-count">{eventPosts.filter(p => p.eventType === 'Club').length} eventos</span>
              </div>
              <div className="popular-event">
                <span className="event-name">Festivales</span>
                <span className="event-count">{eventPosts.filter(p => p.eventType === 'Festival').length} eventos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;