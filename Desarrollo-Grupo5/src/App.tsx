import { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import TopTen from './components/TopTen';
import Releases from './components/Releases';
import ShoppingCart from './views/ShoppingCart';
import Checkout from "./views/Checkout";
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'cart' | 'checkout'>('home');
  const [searchQuery, setSearchQuery] = useState('');

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
        <ShoppingCart onProceedToCheckout={() => setCurrentView('checkout')} />
      )}
      
      {currentView === 'checkout' && (
        <Checkout onBackToCart={() => setCurrentView('cart')} />
      )}
    </div>
  );
}
export default App;
