import React from 'react';
import { Trash2, ShoppingCart } from 'lucide-react';
import { useShoppingCart } from '../context/ShoppingCartContext';
import '../styles/ShoppingCart.css';

interface CartProps {
  onProceedToCheckout: () => void;
  onBackToHome: () => void;
}

const Cart: React.FC<CartProps> = ({ onProceedToCheckout, onBackToHome }) => {
  const { cart, removeFromCart } = useShoppingCart();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.123;
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-title">
            <ShoppingCart className="cart-icon" />
            Carrito
          </h1>
        </div>
        <div className="empty-cart">
          <p className="empty-cart-message">Tu carrito está vacío. ¡Comenzá a comprar!</p>
          <button className="back-to-home-button" onClick={onBackToHome}>
            Volver a la Página principal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1 className="cart-title">
          <ShoppingCart className="cart-icon" />
          Carrito
        </h1>
      </div>

      <div className="cart-content">
        <div className="cart-table-container">
          <table className="cart-table">
            <thead>
              <tr className="table-header">
                <th></th>
                <th>TÍTULO</th>
                <th>ARTISTA</th>
                <th>PRECIO</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="cart-item">
                  <td>
                    <img src={item.cover} alt={item.title} className="cover-image" />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.artist}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <button 
                      className="remove-button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="remove-icon" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span className="summary-label">Subtotal:</span>
            <span className="summary-value">${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Impuestos:</span>
            <span className="summary-value">${tax.toFixed(2)}</span>
          </div>
          <div className="summary-row total-row">
            <span className="summary-label">Total:</span>
            <span className="summary-value total-value">${total.toFixed(2)}</span>
          </div>

          <button className="checkout-button" onClick={onProceedToCheckout}>
            Proceder al Pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
