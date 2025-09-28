import { useState } from 'react';
import { Search, User, ShoppingBag, ChevronDown } from 'lucide-react';
import '../styles/Header.css';

interface ElectronicMusicGenres {
  [key: string]: string[];
}

const electronicGenres: ElectronicMusicGenres = {
  "Electrónico": [
    "House",
    "Progressive House",
    "Techno",
    "Organic House",
    "Melodic Techno",
    "Melodic House"
  ]
};

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenresOpen, setIsGenresOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="logo-section">
            <a href="../App"><h1 className="logo">Beat's</h1></a>
          </div>

          <nav className="navigation">
            <div className="nav-item">
              <button 
                onClick={() => setIsGenresOpen(!isGenresOpen)} 
                className="nav-button"
              >
                <span>Géneros</span>
                <ChevronDown className={`nav-icon ${isGenresOpen ? "rotate" : ""}`} />
              </button>

              {isGenresOpen && (
                <div className="submenu">
                  {Object.entries(electronicGenres).map(([category, subgenres]) => (
                    <div key={category} className="submenu-category">
                      <h4>{category}</h4>
                      <ul>
                        {subgenres.map((genre) => (
                          <li key={genre} className="submenu-item">{genre}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
