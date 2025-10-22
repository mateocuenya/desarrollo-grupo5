import { createContext, useState, useContext, type ReactNode } from 'react';

interface Album {
  id: number;
  title: string;
  artist: string;
  cover: string;
  audio: string;
  price: number;
}

interface CartItem extends Album {
  quantity: number;
}

interface ShoppingCartContextType {
  cart: CartItem[];
  addToCart: (album: Album) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  cartItemCount: number;
  cartTotalPrice: number;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

export const ShoppingCartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (album: Album) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === album.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === album.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...album, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const cartTotalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <ShoppingCartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartItemCount, cartTotalPrice }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (context === undefined) {
    throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
  }
  return context;
};
