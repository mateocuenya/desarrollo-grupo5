import { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import TopTen from './components/TopTen';
import Releases from './components/Releases';
import ShoppingCart from './views/ShoppingCart';
import Checkout from "./views/Checkout";
import Track from "./views/Tracks";
import MisCompras from './views/MisCompras';
import MisVentas from "./views/MisVentas";
import Events from './views/Eventos';
import DjSet from './views/DjSet';
import RegistroEvento from './views/RegistrarEvento';
import Feed from './views/Feed';
import MisTracks from './views/MisTracks';
import { TracksProvider } from './context/TracksContext';
import './App.css';
import Perfil from './views/Perfil';

export type ViewType =
  | 'home' | 'cart' | 'checkout' | 'perfil' | 'compras' | 'ventas'
  | 'tracks' | 'eventos' | 'registroEvento' | 'DjSet' | 'feed' | 'mistracks' ;

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

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [searchQuery, setSearchQuery] = useState('');

  const handleBackToHome = () => setCurrentView('home');

  const [loggedUserName, setLoggedUserName] = useState<string>('Usuario Actual');

  useEffect(() => {
    const storedName = localStorage.getItem('nombreUsuario');
    if (storedName && storedName.trim() !== '') {
      setLoggedUserName(storedName);
    }
  }, []);

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const [eventPosts, setEventPosts] = useState<EventPost[]>(() => {
    const saved = localStorage.getItem('eventPosts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        console.error('Error leyendo eventPosts del localStorage');
      }
    }
    return [
      {
        id: 1,
        title: 'Fiesta electrónica en Mar del Plata',
        description:
          'Increíble noche en la costa argentina. La pista no paró de bailar con este track de Calvin Harris.',
        location: 'Mar del Plata, Argentina',
        eventDate: '2024-01-15',
        eventType: 'Fiesta',
        mediaUrl:
          'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
        mediaType: 'image',
        track: {
          id: 1,
          title: 'Sweet Nothing',
          artist: 'Calvin Harris',
          cover:
            'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=100',
        },
        user: { name: 'DJ Valentina' },
        likes: 24,
        comments: 8,
        isLiked: false,
        createdAt: '2024-01-16',
      },
      {
        id: 2,
        title: 'Set progresivo en Rosario',
        description:
          'Una noche mágica en el underground de Rosario. Guy J siempre entrega esa energía única que conecta con el alma.',
        location: 'Rosario, Argentina',
        eventDate: '2024-01-10',
        eventType: 'Club',
        mediaUrl:
          'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800',
        mediaType: 'image',
        track: {
          id: 2,
          title: 'Early Morning',
          artist: 'Guy J',
          cover:
            'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=100',
        },
        user: { name: 'Carlos Mendez' },
        likes: 18,
        comments: 5,
        isLiked: true,
        createdAt: '2024-01-11',
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('eventPosts', JSON.stringify(eventPosts));
  }, [eventPosts]);

  // Guardar imagen/video en Base64 para persistencia
  const handleEventSubmit = async (eventData: any, mediaFile: File) => {
  const mediaUrl = await getBase64(mediaFile);
  const mediaType = mediaFile.type.startsWith('image/') ? 'image' : 'video';

  const purchasedTracks = [
    {
      id: 1,
      title: 'Sweet Nothing',
      artist: 'Calvin Harris',
      cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      id: 2,
      title: 'Early Morning',
      artist: 'Guy J',
      cover: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      id: 3,
      title: 'Midnight City',
      artist: 'M83',
      cover: 'https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
  ];

  const selectedTrack = purchasedTracks.find(
    (track) => track.id.toString() === eventData.selectedTrack
  );

  if (!selectedTrack) return;

  const newPost: EventPost = {
    id: Date.now(),
    title: eventData.title,
    description: eventData.description || '',
    location: eventData.location || '',
    eventDate: eventData.eventDate || new Date().toISOString().split('T')[0],
    eventType: eventData.eventType,
    mediaUrl, 
    mediaType,
    track: {
      id: selectedTrack.id,
      title: selectedTrack.title,
      artist: selectedTrack.artist,
      cover: selectedTrack.cover, 
    },
    user: { name: localStorage.getItem('nombreUsuario') || 'Invitado' },
    likes: 0,
    comments: 0,
    isLiked: false,
    createdAt: new Date().toISOString(),
  };

  setEventPosts((prev) => [newPost, ...prev]);
  setCurrentView('feed');
};


  return (
    <TracksProvider>
      <div className="app">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          currentView={currentView}
          onViewChange={setCurrentView}
        />

        {currentView === 'home' && (
          <div className="hero">
            <div className="main-container">
              <div className="content-grid">
                <div className="main-content">
                  <HeroSection onGoToDjSet={() => setCurrentView('DjSet')} />
                </div>
                <TopTen />
              </div>
            </div>
            <Releases />
          </div>
        )}

        {currentView === 'cart' && (
          <ShoppingCart
            onProceedToCheckout={() => setCurrentView('checkout')}
            onBackToHome={handleBackToHome}
          />
        )}

        {currentView === 'checkout' && (
          <Checkout
            onBackToCart={() => setCurrentView('cart')}
            onBackToHome={handleBackToHome}
          />
        )}

        {currentView === 'eventos' && (
          <Events
            onBackToHome={handleBackToHome}
            onEventSubmit={handleEventSubmit}
            onBackToEvent={() => setCurrentView('feed')}
          />
        )}

        {currentView === 'feed' && (
          <Feed
            eventPosts={eventPosts}
            onUpdatePosts={setEventPosts}
            onShareEvent={() => setCurrentView('eventos')}
          />
        )}

        {currentView === 'registroEvento' && (
          <RegistroEvento onViewChange={setCurrentView} />
        )}

        {currentView === 'tracks' && <Track onBackToHome={handleBackToHome} />}
        {currentView === 'perfil' && <Perfil onBackToHome={handleBackToHome} />}
        {currentView === 'compras' && <MisCompras onBackToHome={handleBackToHome} />}
        {currentView === 'ventas' && <MisVentas onBackToHome={handleBackToHome} />}
        {currentView === 'DjSet' && <DjSet />}
        {currentView === 'mistracks' && <MisTracks />}
      </div>
    </TracksProvider>
  );
}

export default App;
