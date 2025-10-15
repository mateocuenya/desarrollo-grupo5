import { useState } from 'react';
import { Search, User, ShoppingCart, ChevronDown } from 'lucide-react';
import '../styles/Header.css';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  currentView: 'home' | 'cart';
  onViewChange: (view: 'home' | 'cart') => void;
}

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

export default function Header({
  searchQuery,
  onSearchChange,
  currentView,
  onViewChange
}: HeaderProps) {
  const [isGenresOpen, setIsGenresOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'passw'>('login');

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="logo" onClick={() => onViewChange('home')}>Beat's</h1>

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
          </div>

          <div className="header-actions">
            <div className="search-container">
              <input
                type="text"
                placeholder="Buscar tracks, artistas, etc"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
              />
              <Search className="search-icon" />
            </div>

            <div className="user-menu-container">
              <button 
                className="action-button" 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <User className="action-icon" />
              </button>

              {isUserMenuOpen && (
                <div className="user-menu">
                  <div className="user-menu-tabs">
                    <button 
                      className={`user-tab ${activeTab === 'login' ? 'active' : ''}`} 
                      onClick={() => setActiveTab('login')}
                    >
                      Iniciar Sesión
                    </button>
                    <button 
                      className={`user-tab ${activeTab === 'register' ? 'active' : ''}`} 
                      onClick={() => setActiveTab('register')}
                    >
                      Registrarse
                    </button>
                  </div>

                  {activeTab === 'login' && (
                    <form className="user-form">
                      <input type="email" placeholder="Email *" required />
                      <input type="password" placeholder="Contraseña *" required />
                      <button type="submit" className="form-btn">Ingresar</button>
                      <button
                        type="button"
                        className="forgot-link"
                        onClick={() => setActiveTab('passw')}
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    </form>
                  )}

                  {activeTab === 'register' && (
                    <form className="user-form">
                      <input type="text" placeholder="Nombre completo" required />
                      <input type="email" placeholder="Email *" required />
                      <input type="password" placeholder="Contraseña *" required />
                      <button type="submit" className="form-btn">Registrarse</button>
                    </form>
                  )}

                  {activeTab === 'passw' && (
                    <p className='forgot-message'>
                      Se envió un mail para cambiar tu contraseña al siguiente correo ******@gmail.com
                    </p>
                  )}
                </div>
              )}
            </div>

            <button
              className={`action-button ${currentView === 'cart' ? 'active' : ''}`}
              onClick={() => onViewChange('cart')}
            >
              <ShoppingCart className="action-icon" />
              <span className="cart-badge"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
