// // src/context/WishlistContext.jsx
// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useCart } from "./CartContext";

// export const WishlistContext = createContext();
// export const useWishlist = () => useContext(WishlistContext);

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([]);
//   const token = localStorage.getItem("token");
//   const { addToCart } = useCart();

//   //  Fetch wishlist (only if logged in)
//   useEffect(() => {
//     if (token) {
//       axios
//         .get("/api/wishlist", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((res) => setWishlist(res.data.items || []))
//         .catch((err) => console.error("Fetch wishlist error:", err));
//     } else {
//       // Guest user -> wishlist localStorage se load hogi
//       const localWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//       setWishlist(localWishlist);
//     }
//   }, [token]);

//   //  Save to localStorage (guest only)
//   const saveGuestWishlist = (items) => {
//     setWishlist(items);
//     localStorage.setItem("wishlist", JSON.stringify(items));
//   };

//   //  Toggle Wishlist (add/remove)
//   const toggleWishlist = async (product) => {
//     if (token) {
//       try {
//         const exists = wishlist.find(
//           (item) => item.productId?._id === product._id || item._id === product._id
//         );

//         if (exists) {
//           // remove from db
//           await axios.delete(`/api/wishlist/${product._id}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setWishlist(wishlist.filter((item) =>
//             (item.productId?._id || item._id) !== product._id
//           ));
//         } else {
//           // add to db
//           const res = await axios.post(
//             "/api/wishlist",
//             { productId: product._id },
//             { headers: { Authorization: `Bearer ${token}` } }
//           );
//           setWishlist(res.data.items || []);
//         }
//       } catch (err) {
//         console.error("Wishlist API error:", err);
//       }
//     } else {
//       //  Guest user -> localStorage
//       const exists = wishlist.find((item) => item._id === product._id);
//       if (exists) {
//         const updated = wishlist.filter((item) => item._id !== product._id);
//         saveGuestWishlist(updated);
//       } else {
//         const updated = [...wishlist, product];
//         saveGuestWishlist(updated);
//       }
//     }
//   };

//   //  Move to Cart
//   const moveToCart = (product) => {
//     addToCart(product);
//     toggleWishlist(product);
//   };

//   return (
//     <WishlistContext.Provider value={{ wishlist, toggleWishlist, moveToCart }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };




// backend url  




// src/context/WishlistContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "./CartContext";
import { API_URL } from "../config";

export const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const token = localStorage.getItem("token");
  const { addToCart } = useCart();

  // Fetch wishlist (only if logged in)
  useEffect(() => {
    if (token) {
      axios
        .get(`${API_URL}/api/wishlist`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setWishlist(res.data.items || []))
        .catch((err) => console.error("Fetch wishlist error:", err));
    } else {
      // Guest user -> wishlist from localStorage
      const localWishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlist(localWishlist);
    }
  }, [token]);

  // Save to localStorage (guest only)
  const saveGuestWishlist = (items) => {
    setWishlist(items);
    localStorage.setItem("wishlist", JSON.stringify(items));
  };

  // Toggle Wishlist (add/remove)
  const toggleWishlist = async (product) => {
    if (token) {
      try {
        const exists = wishlist.find(
          (item) =>
            item.productId?._id === product._id || item._id === product._id
        );

        if (exists) {
          // Remove from DB
          await axios.delete(`${API_URL}/api/wishlist/${product._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setWishlist(
            wishlist.filter(
              (item) =>
                (item.productId?._id || item._id) !== product._id
            )
          );
        } else {
          // Add to DB
          const res = await axios.post(
            `${API_URL}/api/wishlist`,
            { productId: product._id },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          setWishlist(res.data.items || []);
        }
      } catch (err) {
        console.error("Wishlist API error:", err);
      }
    } else {
      // Guest user
      const exists = wishlist.find((item) => item._id === product._id);

      if (exists) {
        const updated = wishlist.filter(
          (item) => item._id !== product._id
        );
        saveGuestWishlist(updated);
      } else {
        const updated = [...wishlist, product];
        saveGuestWishlist(updated);
      }
    }
  };

  // Move to Cart
  const moveToCart = (product) => {
    addToCart(product);
    toggleWishlist(product);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, moveToCart }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

