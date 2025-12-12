
// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { useCart } from "../context/CartContext"; // cart data le lo

// const PaymentSelectPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { addressId, token } = location.state || {};

//   const { cart } = useCart(); // 👈 cart context se cart data
//   const [paymentMode, setPaymentMode] = useState("COD");
//   const [loading, setLoading] = useState(false);

//   // total calculate
//   const totalAmount = cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const handleConfirmOrder = async () => {
//     try {
//       setLoading(true);

//       // cart ko backend ke format me map karna hoga
//       const orderItems = cart.map((item) => ({
//         productId: item._id || item.id, // 👈 backend ko productId chahiye
//         quantity: item.quantity,
//         price: item.price || (item.product?.price ?? 0),
//       }));

//       const res = await axios.post(
//         "/api/orders",
//         {
//           addressId,
//           items: orderItems,
//           totalAmount,
//           paymentMethod: paymentMode,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       navigate("/ordersuccess", { state: { order: res.data } });
//     } catch (error) {
//       console.error("Order place error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };


  

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white shadow rounded mt-10">
//       <h2 className="text-2xl font-bold mb-6">Select Payment Method</h2>

//       <div className="space-y-4">
//         <label className="flex items-center gap-2 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="COD"
//             checked={paymentMode === "COD"}
//             onChange={(e) => setPaymentMode(e.target.value)}
//           />
//           <span>Cash on Delivery (COD)</span>
//         </label>

//         <label className="flex items-center gap-2 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="Razorpay"
//             checked={paymentMode === "Razorpay"}
//             onChange={(e) => setPaymentMode(e.target.value)}
//           />
//           <span>Pay Online (Razorpay)</span>
//         </label>
//       </div>

//       <button
//         onClick={handleConfirmOrder}
//         disabled={loading}
//         className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
//       >
//         {loading ? "Placing Order..." : "Confirm Order"}
//       </button>
//     </div>
//   );
// };

// export default PaymentSelectPage;




import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext"; // cart data le lo

const PaymentSelectPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addressId, token } = location.state || {};

  const { cart, clearCart } = useCart(); // 👈 clearCart bhi le lo
  const [paymentMode, setPaymentMode] = useState("COD");
  const [loading, setLoading] = useState(false);

  // total calculate
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleConfirmOrder = async () => {
    try {
      setLoading(true);

      // cart ko backend ke format me map karna hoga
      const orderItems = cart.map((item) => ({
        productId: item._id || item.id, // 👈 backend ko productId chahiye
        quantity: item.quantity,
        price: item.price || (item.product?.price ?? 0),
      }));

      const res = await axios.post(
        "/api/orders",
        {
          addressId,
          items: orderItems,
          totalAmount,
          paymentMethod: paymentMode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // ✅ order successful hone ke baad cart clear kar do
      clearCart();

      navigate("/ordersuccess", { state: { order: res.data } });
    } catch (error) {
      console.error("Order place error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-6">Select Payment Method</h2>

      <div className="space-y-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="COD"
            checked={paymentMode === "COD"}
            onChange={(e) => setPaymentMode(e.target.value)}
          />
          <span>Cash on Delivery (COD)</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="Razorpay"
            checked={paymentMode === "Razorpay"}
            onChange={(e) => setPaymentMode(e.target.value)}
          />
          <span>Pay Online (Razorpay)</span>
        </label>
      </div>

      <button
        onClick={handleConfirmOrder}
        disabled={loading}
        className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
      >
        {loading ? "Placing Order..." : `Confirm Order (₹${totalAmount})`}
      </button>
    </div>
  );
};

export default PaymentSelectPage;

