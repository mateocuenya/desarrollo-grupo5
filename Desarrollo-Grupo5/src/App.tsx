import { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import TopTen from './components/TopTen';
import Releases from './components/Releases';
import ShoppingCart from './views/ShoppingCart';
import Checkout from "./views/Checkout";
import Track from "./views/Tracks";
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'cart' | 'checkout' | 'tracks'>('home');
  const [searchQuery, setSearchQuery] = useState('');

  const handleBackToHome = () => {
    setCurrentView('home');
  };
  
  return (
    <div className="app">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      {currentView === 'home' && (
        <div className="main-container">
          <div className="content-grid">
            <div className="main-content">
              <HeroSection />
              <Releases />
            </div>
            <TopTen />
          </div>
        </div>
      )}
      
   {currentView === 'cart' && (
        <ShoppingCart 
          onProceedToCheckout={() => setCurrentView('checkout')}
          onBackToHome={handleBackToHome}
        />
      )}
      
      {currentView === 'checkout' && (
        <Checkout onBackToCart={() => setCurrentView('cart')} />
      )}

      {currentView === 'tracks' && (
        <Track onBackToHome={handleBackToHome}/>
      )}

    </div>
  );
}
export default App;
