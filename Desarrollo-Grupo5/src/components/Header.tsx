import { useState, useEffect } from 'react';
import { User, ShoppingCart, ChevronDown, Trash2, SquareUserRound, Package, Handbag, FileMusic, LibraryBig } from 'lucide-react';
import '../styles/Header.css';
import { useShoppingCart } from '../context/ShoppingCartContext';
import api from '../services/api';
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
  // Estados UI
  const [isGenresOpen, setIsGenresOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserButtonActive, setIsUserButtonActive] = useState(false);
  const [isCartButtonActive, setIsCartButtonActive] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'passw'>('login');

  // Estado usuario logueado
  const [currentUser, setCurrentUser] = useState<{ name: string } | null>(null);

  // Campos controlados login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Campos controlados registro
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const { cart, removeFromCart, cartItemCount, cartTotalPrice } = useShoppingCart();

  useEffect(() => {
    const saved = localStorage.getItem("usuario");
    if (saved) {
      const usuario = JSON.parse(saved);
      setCurrentUser({ name: usuario.nombreUsuario }); 
    }
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    setIsUserMenuOpen(false);
    onViewChange('home');
  };

  // --- LOGIN ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mailUsuario: loginEmail,
          contrasenaUsuario: loginPassword
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Error al iniciar sesión');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
      setCurrentUser({ name: data.usuario.nombreUsuario });
      setIsUserMenuOpen(false);

      console.log('✅ Login exitoso:', data);
    } catch (error) {
      console.error('Error de red:', error);
      alert('No se pudo conectar con el servidor');
    }
  };

  // --- REGISTRO ---
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/usuarios", {
        nombreUsuario: registerName,
        mailUsuario: registerEmail,
        contrasenaUsuario: registerPassword
      });

      setCurrentUser({ name: res.data.nombreUsuario });
      localStorage.setItem("usuario", JSON.stringify(res.data));
      setIsUserMenuOpen(false);
      console.log("✅ Usuario registrado:", res.data);
    } catch (err: any) {
      alert(err.response?.data?.error || "Error al registrarse");
    }
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
                <button onClick={() => onViewChange('feed')} className="nav-button">
                  <span>Eventos</span>
                </button>
              </div>
            </nav>
          </div>


          <div className="header-actions">
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
                        <li onClick={() => { onViewChange('compras'); setIsUserMenuOpen(false); }}> <Handbag /> Mis Compras</li>
                        <li onClick={() => { onViewChange('ventas'); setIsUserMenuOpen(false); }}> <Package /> Mis Ventas</li>
                        <li onClick={() => { onViewChange('mistracks'); setIsUserMenuOpen(false); }}> <LibraryBig /> Mis Tracks</li>
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

                      {/* LOGIN */}
                      {activeTab === 'login' && (
                        <form className="user-form" onSubmit={handleLogin}>
                          <input
                            type="email"
                            placeholder="Email *"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            required
                          />
                          <input
                            type="password"
                            placeholder="Contraseña *"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                          />
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

                      {/* REGISTRO */}
                      {activeTab === 'register' && (
                        <form className="user-form" onSubmit={handleRegister}>
                          <input
                            type="text"
                            placeholder="Nombre completo"
                            value={registerName}
                            onChange={(e) => setRegisterName(e.target.value)}
                            required
                          />
                          <input
                            type="email"
                            placeholder="Email *"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            required
                          />
                          <input
                            type="password"
                            placeholder="Contraseña *"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            required
                          />
                          <button type="submit" className="form-btn">Registrarse</button>
                        </form>
                      )}

                      {/* OLVIDÉ CONTRASEÑA */}
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
