import React, { useState } from 'react';
import { Trash2, ShoppingCart } from 'lucide-react';
import '../styles/ShoppingCart.css';

interface CartItem {
  id: number;
  title: string;
  artist: string;
  discography: string;
  genre: string;
  bpm: number;
  releaseDate: string;
  format: string;
  price: number;
  cover: string;
}

interface CartProps {
  onProceedToCheckout: () => void;
}

const cartItems: CartItem[] = [
  {
    id: 1,
    title: 'Sweet Nothing',
    artist: 'Calvin Harris',
    discography: 'Disorder',
    genre: 'House',
    bpm: 120,
    releaseDate: '07/02/2003',
    format: 'MP3',
    price: 2.50,
    cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 2,
    title: 'Early Morning',
    artist: 'Guy J',
    discography: 'UTN Records',
    genre: 'Progressive House',
    bpm: 120,
    releaseDate: '07/02/1990',
    format: 'MP3',
    price: 3.60,
    cover: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

const Cart: React.FC<CartProps> = ({ onProceedToCheckout }) => {
  const [items, setItems] = useState<CartItem[]>(cartItems);

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.123; // 12.3% tax rate
  const total = subtotal + tax;

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
                <th className="col-cover"></th>
                <th className="col-title">TÍTULO</th>
                <th className="col-artist">ARTISTA/S</th>
                <th className="col-discography">DISCOGRÁFICA</th>
                <th className="col-genre">GÉNERO</th>
                <th className="col-bpm">BPM</th>
                <th className="col-release">LANZADO</th>
                <th className="col-format">FORMATO</th>
                <th className="col-price">PRECIO</th>
                <th className="col-actions"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="cart-item">
                  <td className="item-cover">
                    <img src={item.cover} alt={item.title} className="cover-image" />
                  </td>
                  <td className="item-title">{item.title}</td>
                  <td className="item-artist">{item.artist}</td>
                  <td className="item-discography">{item.discography}</td>
                  <td className="item-genre">{item.genre}</td>
                  <td className="item-bpm">{item.bpm}</td>
                  <td className="item-release">{item.releaseDate}</td>
                  <td className="item-format">{item.format}</td>
                  <td className="item-price">${item.price.toFixed(2)}</td>
                  <td className="item-actions">
                    <button 
                      className="remove-button"
                      onClick={() => removeItem(item.id)}
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