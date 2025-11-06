import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useShoppingCart } from '../context/ShoppingCartContext';
import '../styles/Checkout.css';
import { validateTrackForm, type ValidationError } from '../utils/validationPago.ts'; 

interface CheckoutProps {
  onBackToCart: () => void;
  onBackToHome: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onBackToCart, onBackToHome }) => {
  const { cart, removeFromCart, clearCart } = useShoppingCart();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.123;
  const total = subtotal + tax;

  const [formData, setFormData] = useState({
    cardNumber: '',
    cvv: '',
    dni: '',
    month: '',
    year: '',
    cardType: '',
    firstName: '',
    lastName: '',
    billingFirstName: '',
    billingLastName: '',
    billingDni: '',
    country: '',
    province: '',
    street: '',
    number: '',
    postalCode: '',
    city: ''
  });

  const [errors, setErrors] = useState<ValidationError>({
    tarjeta: null,
    cvv: null,
    dni: null,
    nombre: null,
    apellido: null,
    calle: null,
    numero: null,
    cp: null,
    ciudad: null
  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupSuccess, setPopupSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = () => {
    const validationResults: ValidationError = validateTrackForm({
      tarjeta: formData.cardNumber,
      cvv: formData.cvv,
      dni: formData.dni,
      nombre: formData.firstName,
      apellido: formData.lastName,
      calle: formData.street,
      numero: formData.number,
      cp: formData.postalCode,
      ciudad: formData.city,
    });

    const hasErrors = Object.values(validationResults).some(error => error !== null);
    if (hasErrors) {
      setErrors(validationResults); 
      setPopupMessage('Por favor, corrige los errores antes de continuar.');
      setPopupSuccess(false);
      setShowPopup(true);
      return;
    }

    setErrors({
      tarjeta: null,
      cvv: null,
      dni: null,
      nombre: null,
      apellido: null,
      calle: null,
      numero: null,
      cp: null,
      ciudad: null
    });

    // --- Simulación de pago ---
    const digitsOnly = formData.cardNumber.replace(/\D/g, '');

    if (digitsOnly.length === 0) {
      setPopupMessage('Ingrese un número de tarjeta para simular la transacción.');
      setPopupSuccess(false);
      setShowPopup(true);
      return;
    }

    const lastDigit = digitsOnly[digitsOnly.length - 1];

    if (lastDigit === '0') {
      setPopupMessage('✅ ¡Pago realizado con éxito! Gracias por tu compra.');
      setPopupSuccess(true);
      setShowPopup(true);
      setTimeout(() => {
        clearCart();
        onBackToHome();
      }, 2000);
      return;
    }

    if (lastDigit === '1') {
      setPopupMessage('❌ Pago rechazado. La transacción fue denegada por el emisor.');
      setPopupSuccess(false);
      setShowPopup(true);
      return;
    }

    setPopupMessage(
      'Para la simulación: usa una tarjeta que termine en 0 (éxito) o en 1 (rechazo).\n' +
      `El número ingresado termina en "${lastDigit}".`
    );
    setPopupSuccess(false);
    setShowPopup(true);
  };

  const closePopup = () => setShowPopup(false);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1 className="checkout-title">Pago</h1>
        <button className="back-to-cart-btn" onClick={onBackToCart}>
          Volver al Carrito
        </button>
      </div>

      <div className="checkout-content">
        {/* --- FORMULARIO --- */}
        <div className="checkout-form">
          <div className="form-section">
            <div className="form-row">
              <div className="form-group full-width">
                <label>Número de tarjeta</label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  className="form-input"
                  placeholder="ej. 4242 4242 4242 4240"
                />
                {errors.tarjeta && <p className="error-text">{errors.tarjeta}</p>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>CVV</label>
                <input
                  type="text"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  className="form-input"
                />
                {errors.cvv && <p className="error-text">{errors.cvv}</p>}
              </div>
              <div className="form-group">
                <label>DNI</label>
                <input
                  type="text"
                  value={formData.dni}
                  onChange={(e) => handleInputChange('dni', e.target.value)}
                  className="form-input"
                />
                {errors.dni && <p className="error-text">{errors.dni}</p>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Mes</label>
                <select
                  value={formData.month}
                  onChange={(e) => handleInputChange('month', e.target.value)}
                  className="form-select"
                >
                  <option value="">Seleccionar</option>
                  <option>Enero</option><option>Febrero</option><option>Marzo</option>
                  <option>Abril</option><option>Mayo</option><option>Junio</option>
                  <option>Julio</option><option>Agosto</option><option>Septiembre</option>
                  <option>Octubre</option><option>Noviembre</option><option>Diciembre</option>
                </select>
              </div>

              <div className="form-group">
                <label>Año</label>
                <select
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  className="form-select"
                >
                  <option value="">Seleccionar</option>
                  <option>2025</option><option>2026</option><option>2027</option>
                  <option>2028</option><option>2029</option><option>2030</option>
                  <option>2031</option><option>2032</option><option>2033</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tarjeta</label>
                <select
                  value={formData.cardType}
                  onChange={(e) => handleInputChange('cardType', e.target.value)}
                  className="form-select"
                >
                  <option value="">Seleccionar</option>
                  <option>Visa</option><option>Mastercard</option><option>American Express</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="form-input"
                />
                {errors.nombre && <p className="error-text">{errors.nombre}</p>}
              </div>
              <div className="form-group">
                <label>Apellido</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="form-input"
                />
                {errors.apellido && <p className="error-text">{errors.apellido}</p>}
              </div>
            </div>
          </div>

          {/* --- FACTURACIÓN --- */}
          <div className="form-section">
            <h3 className="section-title">Información de facturación</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  value={formData.billingFirstName}
                  onChange={(e) => handleInputChange('billingFirstName', e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Apellido</label>
                <input
                  type="text"
                  value={formData.billingLastName}
                  onChange={(e) => handleInputChange('billingLastName', e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>DNI</label>
                <input
                  type="text"
                  value={formData.billingDni}
                  onChange={(e) => handleInputChange('billingDni', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>País</label>
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="form-select"
                >
                  <option value="">Seleccionar</option>
                  <option>Argentina</option><option>Brasil</option><option>Chile</option>
                  <option>Uruguay</option><option>Paraguay</option>
                </select>
              </div>

              <div className="form-group">
                <label>Provincia</label>
                <select
                  value={formData.province}
                  onChange={(e) => handleInputChange('province', e.target.value)}
                  className="form-select"
                >
                  <option value="">Seleccionar</option>
                  <option>Buenos Aires</option><option>Córdoba</option>
                  <option>Santa Fe</option><option>Mendoza</option><option>Tucumán</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Calle</label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => handleInputChange('street', e.target.value)}
                  className="form-input"
                />
                {errors.calle && <p className="error-text">{errors.calle}</p>}
              </div>
              <div className="form-group">
                <label>Número</label>
                <input
                  type="text"
                  value={formData.number}
                  onChange={(e) => handleInputChange('number', e.target.value)}
                  className="form-input"
                />
                {errors.numero && <p className="error-text">{errors.numero}</p>}
              </div>
              <div className="form-group">
                <label>CP</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  className="form-input"
                />
                {errors.cp && <p className="error-text">{errors.cp}</p>}
              </div>
              <div className="form-group">
                <label>Ciudad</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="form-input"
                />
                {errors.ciudad && <p className="error-text">{errors.ciudad}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* --- RESUMEN --- */}
        <div className="order-summary">
          <h3 className="summary-title">TU PEDIDO</h3>

          <div className="order-items">
            <div className="items-header">
              <span className="header-track">TRACK</span>
              <span className="header-subtotal">SUBTOTAL</span>
            </div>

            {cart.map((item) => (
              <div key={item.id} className="order-item">
                <div className="item-info">
                  <img src={item.cover} alt={item.title} className="item-cover" />
                  <div className="item-details">
                    <h4 className="item-title">{item.title}</h4>
                    <p className="item-artist">{item.artist}</p>
                  </div>
                </div>
                <div className="item-price-actions">
                  <span className="item-price">${item.price.toFixed(2)}</span>
                  <button 
                    className="remove-item-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="remove-icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="total-row">
              <span className="total-label">Subtotal:</span>
              <span className="total-value">${subtotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span className="total-label">Impuestos:</span>
              <span className="total-value">${tax.toFixed(2)}</span>
            </div>
            <div className="total-row final-total">
              <span className="total-label">Total:</span>
              <span className="total-value">${total.toFixed(2)}</span>
            </div>
          </div>

          <button className="pay-button" onClick={handlePayment}>
            Pagar
          </button>
        </div>
      </div>

      {/* --- POPUP --- */}
      {showPopup && (
        <div className="popup-overlay">
          <div className={`popup-box ${popupSuccess ? 'success' : 'error'}`}>
            <p style={{ whiteSpace: 'pre-wrap' }}>{popupMessage}</p>
            <button className="popup-btn" onClick={closePopup}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;