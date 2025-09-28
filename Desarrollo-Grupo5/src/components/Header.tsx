import { useState } from 'react';
import { Search, User, ShoppingBag, ChevronDown } from 'lucide-react';
import '../styles/Header.css';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="logo-section">
            <a href="../App"><h1 className="logo">Beat's</h1></a>
          </div>

          <nav className="navigation">
            <button className="nav-button">
              <span>Géneros</span>
              <ChevronDown className="nav-icon" />
            </button>
          </nav>

          <div className="header-actions">
            <div className="search-container">
              <input
                type="text"
                placeholder="Buscar tracks, artistas, etc"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <Search className="search-icon" />
            </div>
            <button className="action-button">
              <User className="action-icon" />
            </button>
            <button className="action-button">
              <ShoppingBag className="action-icon" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
