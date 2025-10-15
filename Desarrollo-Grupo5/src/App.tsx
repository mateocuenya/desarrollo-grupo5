import { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import TopTen from './components/TopTen';
import Releases from './components/Releases';
import ShoppingCart from './views/ShoppingCart';
import './App.css';

function App() {
 const [currentView, setCurrentView] = useState<'home' | 'cart'>('home');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="app">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      {currentView === 'home' ? (
        <div className="main-container">
          <div className="content-grid">
            <div className="main-content">
              <HeroSection />
              <Releases />
            </div>
            <TopTen />
          </div>
        </div>
      ) : (
        <ShoppingCart />
      )}
    </div>
  );
}
export default App;
