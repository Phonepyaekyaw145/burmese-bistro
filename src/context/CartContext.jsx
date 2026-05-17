import { createContext, useContext, useState, useCallback } from "react";
import { toast } from "sonner";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({}); // { [id]: { product, qty } }
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = useCallback(() => setSidebarOpen((o) => !o), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  // ── Cart actions ─────────────────────────────
  const addItem = useCallback((product) => {
    setCart((prev) => {
      const existing = prev[product.id];
      return {
        ...prev,
        [product.id]: existing
          ? { ...existing, qty: existing.qty + 1 }
          : { product, qty: 1 },
      };
    });
    showToast(`Added ${product.name}`);
  }, []);

  const updateQty = useCallback((id, delta) => {
    setCart((prev) => {
      const item = prev[id];
      if (!item) return prev;
      const newQty = item.qty + delta;
      if (newQty <= 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: { ...item, qty: newQty } };
    });
  }, []);

  const clearCart = useCallback(() => setCart({}), []);

  const cartItems = Object.values(cart);
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.product.price * i.qty, 0);

  // ── Dark mode ────────────────────────────────
  const toggleDark = useCallback(() => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  }, []);

  // ── Toast (delegated to sonner) ───────────────
  const showToast = useCallback((msg) => {
    toast(msg);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems,
        cartCount,
        cartTotal,
        addItem,
        updateQty,
        clearCart,
        dark,
        toggleDark,
        sidebarOpen,
        toggleSidebar,
        closeSidebar,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
