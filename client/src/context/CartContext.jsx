
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    setCart((items) => {
      const existing = items.find((item) => item._id === product._id);

      if (existing) {
        if (existing.quantity >= (product.stock ?? Infinity)) {
          return items;
        }

        return items.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      if (product.stock === 0) return items;

      return [...items, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((items) => items.filter((item) => item._id !== id));
  }

  function updateQuantity(id, quantity) {
    setCart((items) =>
      items.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: Math.max(
                1,
                Math.min(Number(quantity) || 1, item.stock ?? Infinity)
              ),
            }
          : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, total, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
