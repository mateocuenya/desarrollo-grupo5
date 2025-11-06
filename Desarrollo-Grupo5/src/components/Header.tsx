import { useState } from 'react';
import { Search, User, ShoppingCart, ChevronDown, Trash2, SquareUserRound, Package, Handbag, FileMusic, LibraryBig } from 'lucide-react';
import '../styles/Header.css';
import { useShoppingCart } from '../context/ShoppingCartContext';

import { type ViewType } from '../App';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  currentView: ViewType; 
  onViewChange: (view: ViewType) => void; 
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

  // Estado para el usuario logueado
  const [currentUser, setCurrentUser] = useState<{ name: string } | null>(null);

  const { cart, removeFromCart, cartItemCount, cartTotalPrice } = useShoppingCart();

  const handleLogout = () => {
    setCurrentUser(null);
    setIsUserMenuOpen(false);
  };

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
               {/* ITEM: Eventos */}
              <div className="nav-item">
                <div className="nav-item">
                  <button onClick={() => onViewChange('eventos')} className="nav-button"> {/* <-- ¡CORREGIDO! */}
                    <span>Eventos</span>
                  </button>
                </div>
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
                  {currentUser ? (
                    <div className="user-logged-in">
                      <p className="user-name">Hola, {currentUser.name}</p>
                      <ul className="user-options">
                        <li onClick={() => { onViewChange('perfil'); setIsUserMenuOpen(false); }}> <SquareUserRound /> Perfil</li>
                        <li onClick={() => { onViewChange('coleccion'); setIsUserMenuOpen(false); }}><LibraryBig />Colecciones</li>
                        <li onClick={() => { onViewChange('compras'); setIsUserMenuOpen(false); }}> <Handbag /> Mis Compras</li>
                        <li onClick={() => { onViewChange('ventas'); setIsUserMenuOpen(false); }}> <Package /> Mis Ventas</li>
                        <li onClick={() => { onViewChange('tracks'); setIsUserMenuOpen(false); }}> <FileMusic /> Tracks</li>
                        <li onClick={handleLogout} className='log-out'>Cerrar Sesión</li>
                      </ul>
                    </div>
                  ) : (
                    <>
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
                        <form 
                          className="user-form" 
                          onSubmit={(e) => {
                            e.preventDefault();
                            // Simula login exitoso
                            setCurrentUser({ name: "Juan Pérez" });
                            setIsUserMenuOpen(false);
                          }}
                        >
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
                        <form 
                          className="user-form" 
                          onSubmit={(e) => {
                            e.preventDefault();
                            // Simula registro exitoso
                            setCurrentUser({ name: "Nuevo Usuario" });
                            setIsUserMenuOpen(false);
                          }}
                        >
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
                    </>
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
