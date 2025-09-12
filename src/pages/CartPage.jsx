// // src/pages/CartPage.jsx
// import React, { useContext } from "react";
// import { CartContext } from "../context/CartContext";
// import { Trash2, Plus, Minus } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";

// const CartPage = () => {
//   const { cart, removeFromCart, getTotalPrice, increaseQuantity, decreaseQuantity } =
//     useContext(CartContext);

//   const totalPrice = getTotalPrice();   // ✅ now works
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const handlePlaceOrder = () => {
//     if (!token) {
//       localStorage.setItem("redirectTo", "/checkout");
//       navigate("/login");
//     } else navigate("/checkout");
//   };

//   if (!Array.isArray(cart)) return <div>Cart data invalid</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-8">
//       <h2 className="text-2xl font-semibold mb-6 text-center">Shopping Cart</h2>

//       {cart.length === 0 ? (
//         <div className="text-center mt-20">
//           <h3 className="text-xl text-gray-500">Your cart is empty</h3>
//           <Link
//             to="/"
//             className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//           >
//             Go Shopping
//           </Link>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="md:col-span-2 space-y-6">
//             {cart.map((item) => (
//               <div key={item.id} className="flex items-center bg-white rounded shadow p-4">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-24 h-24 object-contain mr-4"
//                 />

//                 <div className="flex-1">
//                   <h4 className="text-lg font-semibold">{item.title}</h4>
//                   <p className="text-sm text-gray-600">₹{item.price}</p>

//                   <div className="flex items-center mt-2 space-x-2">
//                     <button
//                       onClick={() => decreaseQuantity(item.id)}
//                       className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
//                     >
//                       <Minus size={16} />
//                     </button>
//                     <span className="px-3">{item.quantity}</span>
//                     <button
//                       onClick={() => increaseQuantity(item.id)}
//                       className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
//                     >
//                       <Plus size={16} />
//                     </button>
//                     <button
//                       onClick={() => removeFromCart(item.id)}
//                       className="ml-4 text-red-500 hover:text-red-700"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                 </div>

//                 <div className="text-lg font-medium ml-4">
//                   ₹{item.price * item.quantity}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Price Summary */}
//           <div className="bg-white rounded shadow p-6 h-fit">
//             <h4 className="text-lg font-semibold mb-4">Price Details</h4>
//             <div className="space-y-2 text-sm">
//               <div className="flex justify-between">
//                 <span>Price ({cart.length} items)</span>
//                 <span>₹{totalPrice}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Delivery Charges</span>
//                 <span className="text-green-600">FREE</span>
//               </div>
//               <hr className="my-2" />
//               <div className="flex justify-between font-semibold text-base">
//                 <span>Total Amount</span>
//                 <span>₹{totalPrice}</span>
//               </div>
//             </div>
//             <button
//               onClick={handlePlaceOrder}
//               className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//             >
//               Place Order
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;





// src/pages/CartPage.jsx
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    getTotalPrice,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handlePlaceOrder = () => {
    if (!token) {
      localStorage.setItem("redirectTo", "/checkout");
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  // ✅ Safe check
  if (!Array.isArray(cart)) return <div>Cart data invalid</div>;

  const totalPrice = getTotalPrice();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center mt-20">
          <h3 className="text-xl text-gray-500">Your cart is empty</h3>
          <Link
            to="/"
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-white rounded shadow p-4"
              >
                {/* ✅ fallback image fix */}
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.title || "Product"}
                  className="w-24 h-24 object-contain mr-4"
                />

                <div className="flex-1">
                  <h4 className="text-lg font-semibold">
                    {item.title || "Unknown Product"}
                  </h4>
                  <p className="text-sm text-gray-600">₹{item.price || 0}</p>

                  <div className="flex items-center mt-2 space-x-2">
                    {/* ✅ disable when quantity = 1 */}
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity <= 1}
                      className={`px-2 py-1 rounded ${
                        item.quantity <= 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      <Minus size={16} />
                    </button>

                    <span className="px-3">{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      <Plus size={16} />
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="text-lg font-medium ml-4">
                  ₹{(item.price || 0) * (item.quantity || 1)}
                </div>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="bg-white rounded shadow p-6 h-fit">
            <h4 className="text-lg font-semibold mb-4">Price Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Price ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-600">FREE</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold text-base">
                <span>Total Amount</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
