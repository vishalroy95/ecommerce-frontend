// // src/pages/WishlistPage.jsx
// import React, { useContext } from "react";
// import axios from "axios";
// import { WishlistContext } from "../context/WishlistContext";
// import { CartContext } from "../context/CartContext";

// const WishlistPage = () => {
//   const { wishlist, removeFromWishlist, fetchWishlist } = useContext(WishlistContext);
//   const { fetchCart } = useContext(CartContext);

//   const token = localStorage.getItem("token");

//   const moveToCart = async (productId) => {
//     try {
//       await axios.post(
//         `/api/cart/move-from-wishlist/${productId}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // Refresh wishlist and cart after moving
//       fetchWishlist();
//       fetchCart();
//       alert("✅ Product moved to cart!");
//     } catch (err) {
//       console.error("❌ Failed to move product:", err);
//       alert("Failed to move product to cart.");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>
//       {wishlist.length === 0 ? (
//         <p>Your wishlist is empty.</p>
//       ) : (
//         <div className="grid gap-4">
//           {wishlist.map((item) => (
//             <div
//               key={item._id}
//               className="flex justify-between items-center border p-4 rounded shadow"
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                   src={
//                     item.productId?.image ||
//                     item.image ||
//                     "/placeholder.png"
//                   }
//                   alt={item.productId?.title || item.title || "Product"}
//                   className="w-20 h-20 object-cover rounded"
//                 />
//                 <div>
//                   <h3 className="font-semibold">
//                     {item.productId?.title || item.title || "Untitled"}
//                   </h3>
//                   <p className="text-gray-600">
//                     ₹{item.productId?.price || item.price || 0}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => removeFromWishlist(item._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 >
//                   Remove
//                 </button>
//                 <button
//                   onClick={() => moveToCart(item.productId?._id || item._id)}
//                   className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WishlistPage;



import { useWishlist } from "../context/WishlistContext";

const WishlistPage = () => {
  const { wishlist, toggleWishlist, moveToCart } = useWishlist();

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishlist.map((item) => {
            const product = item.productId || item; 
            return (
              <div
                key={product._id}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <img
                  src={product.image || "/placeholder.jpg"}
                  alt={product.name}
                  className="w-full h-40 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">₹{product.price}</p>

                <div className="flex gap-3 mt-4">
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={() => moveToCart(product)}
                  >
                    Move to Cart
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => toggleWishlist(product)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;



