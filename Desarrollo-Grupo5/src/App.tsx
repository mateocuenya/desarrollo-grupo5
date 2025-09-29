import Header from './components/Header';
import HeroSection from './components/HeroSection';
import TopTen from './components/TopTen';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header/>
      <div className="main-container">
        <div className="content-grid">
          <div className="main-content">
            <HeroSection />
          </div>
          <TopTen/>
        </div>
      </div>
    </div>
  );
}

export default App;