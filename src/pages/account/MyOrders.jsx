// // src/pages/Orders.jsx
// import { useEffect, useState } from "react";
// import axios from "axios";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const { data } = await axios.get("http://localhost:5000/api/orders", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setOrders(data);
//       } catch (error) {
//         console.error("❌ Error fetching orders:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   if (loading) return <p className="text-center mt-10">Loading orders...</p>;
//   if (!orders.length) return <p className="text-center mt-10">No orders found.</p>;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h2>

//       <div className="space-y-6">
//         {orders.map((order) => (
//           <div
//             key={order._id}
//             className="bg-white shadow-md rounded-xl p-5 border border-gray-200"
//           >
//             {/* Order Header */}
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="font-semibold text-gray-700">
//                 Order ID: <span className="text-gray-900">{order._id}</span>
//               </h3>
//               <p className="text-sm text-gray-500">
//                 {new Date(order.createdAt).toLocaleDateString()}
//               </p>
//             </div>

//             {/* Order Items */}
//             <div className="divide-y divide-gray-200">
//               {order.items.map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center gap-4 py-4"
//                 >
//                   {/* Product Image */}
//                   <img
//                     src={item.productId?.image || "/assets/placeholder.png"}
//                     alt={item.productId?.title || "Product"}
//                     className="w-20 h-20 object-cover rounded-lg border"
//                   />

//                   {/* Product Details */}
//                   <div className="flex-1">
//                     <h4 className="font-medium text-gray-800">
//                       {item.productId?.title || "Unknown Product"}
//                     </h4>
//                     <p className="text-sm text-gray-500">
//                       Qty: {item.quantity}
//                     </p>
//                   </div>

//                   {/* Price */}
//                   <div className="text-right">
//                     <p className="font-semibold text-gray-800">
//                       ₹{item.price}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Order Footer */}
//             <div className="mt-4 flex justify-between items-center border-t pt-4">
//               <p className="font-semibold text-gray-700">
//                 Total: ₹{order.totalAmount}
//               </p>
//               <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-600 font-medium">
//                 {order.paymentMethod}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;




// updated url 




// src/pages/Orders.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config"; // <- import

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${API_URL}/api/orders`, {  // <- URL updated
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(data);
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;
  if (!orders.length) return <p className="text-center mt-10">No orders found.</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-xl p-5 border border-gray-200"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-700">
                Order ID: <span className="text-gray-900">{order._id}</span>
              </h3>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Order Items */}
            <div className="divide-y divide-gray-200">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 py-4"
                >
                  {/* Product Image */}
                  <img
                    src={item.productId?.image || "/assets/placeholder.png"}
                    alt={item.productId?.title || "Product"}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />

                  {/* Product Details */}
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">
                      {item.productId?.title || "Unknown Product"}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">
                      ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Footer */}
            <div className="mt-4 flex justify-between items-center border-t pt-4">
              <p className="font-semibold text-gray-700">
                Total: ₹{order.totalAmount}
              </p>
              <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-600 font-medium">
                {order.paymentMethod}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
