// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const isAuthed = !!token;

  //  normalize
  const normalizeItem = (raw) => {
    const pid = raw.productId?._id || raw.productId || raw._id || raw.id;
    return {
      // 🔥 agar pid missing hai to ek random id generate karo
      id: pid?.toString() || `guest-${Date.now()}-${Math.random()}`,
      title: raw.productId?.title || raw.title || raw.name || "Unknown Product",
      price: Number(raw.productId?.price || raw.price || 0),
      image: raw.productId?.image || raw.image || "/placeholder.png",
      quantity: Number(raw.quantity || 1),
    };
  };

  // Guest cart utils
  const readGuestCart = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("guestCart") || "[]");
      return stored.map(normalizeItem);
    } catch {
      return [];
    }
  };

  const writeGuestCart = (items) => {
    localStorage.setItem("guestCart", JSON.stringify(items));
  };

  // Fetch cart on mount
  useEffect(() => {
    (async () => {
      setLoading(true);
      if (isAuthed) {
        try {
          const res = await axios.get("/api/cart", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCart((res.data?.cart?.items || []).map(normalizeItem));
        } catch (err) {
          console.error("Error fetching cart:", err);
          setCart([]);
        }
      } else {
        setCart(readGuestCart());
      }
      setLoading(false);
    })();
  }, [isAuthed, token]);

  //  Add to cart
  const addToCart = async (product, qty = 1) => {
    const productId = product._id || product.id || product.productId;

    // guest cart case
    const normalized = normalizeItem({ ...product, _id: productId, quantity: qty });

    if (isAuthed) {
      try {
        const res = await axios.post(
          "/api/cart/add",
          { productId: (productId || "").toString(), quantity: qty },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCart((res.data?.cart?.items || []).map(normalizeItem));
      } catch (err) {
        console.error("Error adding to server cart:", err);
      }
    } else {
      const updated = [...cart];
      const idx = updated.findIndex((i) => i.id === normalized.id);
      if (idx >= 0) updated[idx].quantity += qty;
      else updated.push(normalized);
      setCart(updated);
      writeGuestCart(updated);
    }
  };

  //  Remove from cart
  const removeFromCart = async (id) => {
    if (!id) return;
    if (isAuthed) {
      try {
        const res = await axios.post(
          "/api/cart/remove",
          { productId: id.toString() },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCart((res.data?.cart?.items || []).map(normalizeItem));
      } catch (err) {
        console.error("Error removing from cart:", err);
      }
    } else {
      const updated = cart.filter((i) => i.id.toString() !== id.toString());
      setCart(updated);
      writeGuestCart(updated);
    }
  };

  //  Set quantity
  const setQuantity = async (id, qty) => {
    if (qty <= 0) return removeFromCart(id);

    if (isAuthed) {
      try {
        const res = await axios.post(
          "/api/cart/update",
          { productId: id.toString(), quantity: qty },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCart((res.data?.cart?.items || []).map(normalizeItem));
      } catch (err) {
        console.error("Error updating cart:", err);
      }
    } else {
      const updated = cart.map((i) =>
        i.id === id.toString() ? { ...i, quantity: qty } : i
      );
      setCart(updated);
      writeGuestCart(updated);
    }
  };

  //  Quantity helpers
  const increaseQuantity = (id) => {
    const item = cart.find((i) => i.id === id.toString());
    if (!item) return;
    setQuantity(id, item.quantity + 1);
  };

  const decreaseQuantity = (id) => {
    const item = cart.find((i) => i.id === id.toString());
    if (!item) return;
    setQuantity(id, item.quantity - 1);
  };

  //  Clear cart
  const clearCart = async () => {
    if (isAuthed) {
      try {
        await axios.post(
          "/api/cart/clear",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCart([]);
      } catch (err) {
        console.error("Error clearing cart:", err);
      }
    } else {
      setCart([]);
      writeGuestCart([]);
    }
  };

  //  Helpers
  const getTotalItems = () =>
    cart.reduce((sum, i) => sum + i.quantity, 0);

  const getTotalPrice = () =>
    cart.reduce((sum, i) => sum + i.quantity * i.price, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        setQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
