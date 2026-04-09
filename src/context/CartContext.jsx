import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, qty, color, size) => {
    setCartItems((prev) => {
      const key = `${product.id}-${color}-${size}`;
      const exists = prev.find((i) => i.key === key);
      if (exists) {
        return prev.map((i) => i.key === key ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { ...product, qty, color, size, key }];
    });
  };

  const removeFromCart = (key) => {
    setCartItems((prev) => prev.filter((i) => i.key !== key));
  };

  const updateQty = (key, qty) => {
    if (qty < 1) return removeFromCart(key);
    setCartItems((prev) => prev.map((i) => i.key === key ? { ...i, qty } : i));
  };

  const clearCart = () => setCartItems([]);

  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
