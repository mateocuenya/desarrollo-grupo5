import { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import TopTen from './components/TopTen';
import Releases from './components/Releases';
import ShoppingCart from './views/ShoppingCart';
import Checkout from "./views/Checkout";
import Track from "./views/Tracks";
import MisCompras from './views/MisCompras';
import MisVentas from "./views/MisVentas";
import Eventos from "./views/Eventos";
import DjSet from './views/DjSet';
import RegistroEvento from './views/RegistrarEvento';
import { TracksProvider } from './context/TracksContext';
import './App.css';
import Perfil from './views/Perfil';
import Coleccion from './views/Coleccion';

export type ViewType = 'home' | 'cart' | 'checkout' | 'perfil' | 'coleccion'| 'compras'| 'ventas' | 'tracks' | 'eventos' | 'registroEvento' | 'DjSet';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [searchQuery, setSearchQuery] = useState('');

  const handleBackToHome = () => setCurrentView('home');

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
          <div className='hero'>
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
          <Checkout onBackToCart={() => setCurrentView('cart')} 
          onBackToHome={handleBackToHome} 
          />
        )}

        {currentView === 'eventos' && (
          <Eventos 
            onBackToHome={handleBackToHome}
            onViewChange={setCurrentView} 
          />
        )}

        {currentView === 'registroEvento' && (
          <RegistroEvento 
            onViewChange={setCurrentView}
          />
        )}

        {currentView === 'tracks' && (
          <Track onBackToHome={handleBackToHome} 
          />
        )}

        {currentView === 'perfil' && (
          <Perfil onBackToHome={handleBackToHome} />
        )}

        {currentView === 'coleccion' && (
          <Coleccion onBackToHome={handleBackToHome} />
        )}

        {currentView === 'compras' && (
          <MisCompras onBackToHome={handleBackToHome} />
        )}
        
        {currentView === 'ventas' && (
          <MisVentas onBackToHome={handleBackToHome} />
        )}

        {currentView === 'DjSet' && (
          <DjSet/>
        )}
        
      </div>
    </TracksProvider>
  );
}

export default App;
