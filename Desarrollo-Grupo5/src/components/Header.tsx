import { useState } from 'react';
import { Search, User, ShoppingCart, ChevronDown, Trash2 } from 'lucide-react';
import '../styles/Header.css';
import { useShoppingCart } from '../context/ShoppingCartContext';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  currentView: 'home' | 'cart' | 'checkout';
  onViewChange: (view: 'home' | 'cart' | 'checkout') => void;
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
  onViewChange
}: HeaderProps) {
  const [isGenresOpen, setIsGenresOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserButtonActive, setIsUserButtonActive] = useState(false);
  const [isCartButtonActive, setIsCartButtonActive] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'passw'>('login');

  const { cart, removeFromCart, cartItemCount, cartTotalPrice } = useShoppingCart();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">

          {/* LOGO */}
          <div className="logo-section">
            <h1 className="logo" onClick={() => onViewChange('home')}>Beat's</h1>

            {/* NAVEGACIÓN */}
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

          {/* ACCIONES */}
          <div className="header-actions">
            {/* SEARCH */}
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

            {/* USER */}
            <div className="user-menu-container">
              <button
                className={`action-button ${isUserButtonActive ? 'active' : ''}`}
                onClick={() => {
                  setIsUserMenuOpen(!isUserMenuOpen);
                  setIsUserButtonActive(!isUserButtonActive);
                  if (isCartButtonActive) setIsCartButtonActive(false);
                  if (isCartOpen) setIsCartOpen(false);
                }}
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

            {/* CART */}
            <div className="cart-menu-container" style={{ position: 'relative' }}>
              <button
                className={`action-button ${isCartButtonActive ? 'active' : ''}`}
                onClick={() => {
                  setIsCartOpen(!isCartOpen);
                  setIsCartButtonActive(!isCartButtonActive);
                  if (isUserButtonActive) setIsUserButtonActive(false);
                  if (isUserMenuOpen) setIsUserMenuOpen(false);
                }}
              >
                <ShoppingCart className="action-icon" />
                {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
              </button>

              {isCartOpen && (
                <div className="cart-dropdown">
                  {cart.length === 0 ? (
                    <p className="empty-cart-message">Tu carrito está vacío. ¡Comenzá a comprar!</p>
                  ) : (
                    <>
                      <div className="cart-items">
                        {cart.map(item => (
                          <div key={item.id} className="cart-dropdown-item">
                            <img src={item.cover} alt={item.title} className="cart-item-cover" />
                            <div className="cart-item-info">
                              <span className="cart-item-title">{item.title}</span>
                              <span className="cart-item-artist">{item.artist}</span>
                              <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                            <button
                              className="cart-item-remove"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="cart-dropdown-total">
                        <span>Total:</span>
                        <span>${cartTotalPrice.toFixed(2)}</span>
                      </div>
                      <div className="cart-dropdown-actions">
                        <button onClick={() => { setIsCartOpen(false); setIsCartButtonActive(false); onViewChange('cart'); }}>Ver Carrito</button>
                        <button onClick={() => { setIsCartOpen(false); setIsCartButtonActive(false); onViewChange('checkout'); }}>Finalizar Compra</button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
