// import React, { useContext } from "react";
// import { CartContext } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { Heart } from "lucide-react";
// import useProducts from "../hooks/useProducts";
// import { toast } from "react-toastify";

// const BestDeals = () => {
//   const { products, loading } = useProducts();
//   const { addToCart } = useContext(CartContext);
//   const { wishlist, toggleWishlist } = useWishlist();

//   if (loading) return <div className="text-center py-10">Loading deals...</div>;

//   return (
//     <section className="py-10 bg-gradient-to-b from-pink-50 to-white">
//       <div className="max-w-7xl mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center text-pink-700 mb-8">
//           🔥 Best Sellers
//         </h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {products.map((deal) => {
//             // ✅ Check for both login-user (item.productId) and guest-user (item directly)
//             const isWishlisted = wishlist.some(
//               (item) =>
//                 (item.productId ? item.productId._id : item._id) === deal._id
//             );

//             return (
//               <div
//                 key={deal._id}
//                 className="relative bg-white rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden flex flex-col"
//               >
//                 <img
//                   src={deal.image}
//                   alt={deal.title}
//                   className="h-48 object-contain"
//                 />

//                 {/* ❤️ Wishlist button */}
//                 {/* <div
//                   className="absolute top-2 right-2 z-10 cursor-pointer"
//                   onClick={() => toggleWishlist(deal)}
//                 >
//                   {isWishlisted ? (
//                     <Heart className="text-red-500 fill-red-500" size={20} />
//                   ) : (
//                     <Heart
//                       className="text-white stroke-[2] stroke-gray-600"
//                       size={20}
//                     />
//                   )}
//                 </div> */}


//                 <div
//   className="absolute top-2 right-2 z-10 cursor-pointer"
//   onClick={() => {
//     toggleWishlist(deal);
//     if (isWishlisted) {
//       toast.info(`${deal.title} removed from wishlist`);
//     } else {
//       toast.success(`${deal.title} added to wishlist`);
//     }
//   }}
// >
//   {isWishlisted ? (
//     <Heart className="text-red-500 fill-red-500" size={20} />
//   ) : (
//     <Heart
//       className="text-white stroke-[2] stroke-gray-600"
//       size={20}
//     />
//   )}
// </div>

//                 {/* Product Info */}
//                 <div className="p-4 flex-grow flex flex-col items-center justify-between">
//                   <div className="text-center mb-2">
//                     <p className="text-lg font-semibold text-gray-800">
//                       {deal.title}
//                     </p>
//                     <span className="text-pink-600 font-bold text-sm mt-1 block">
//                       ₹{deal.price}
//                     </span>
//                   </div>

//                   {/* 🛒 Add to Cart */}
//                   {/* <button
//                     onClick={() => addToCart(deal)}
//                     className="mt-2 bg-pink-600 hover:bg-pink-700 text-white font-medium px-4 py-2 rounded-full text-sm"
//                   >
//                     Add to Cart
//                   </button> */}

//                 <button
//                   onClick={() => {
//                   addToCart(deal);
//                   toast.success(`${deal.title} added to cart!`);
//               }}
//                   className="mt-2 bg-pink-600 hover:bg-pink-700 text-white font-medium px-4 py-2 rounded-full text-sm"
//               >
//                   Add to Cart
//                </button>

//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BestDeals;




import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Heart } from "lucide-react";
import useProducts from "../hooks/useProducts";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"; 

const BestDeals = () => {
  const { products, loading } = useProducts();
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useWishlist();

  if (loading) return <div className="text-center py-10">Loading deals...</div>;

  return (
    <section className="py-10 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-8">
          🔥 Best Sellers
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((deal) => {
            const isWishlisted = wishlist.some(
              (item) =>
                (item.productId ? item.productId._id : item._id) === deal._id
            );

            return (
              <div
                key={deal._id}
                className="relative bg-white rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden flex flex-col"
              >
                
                <Link to={`/product/${deal._id}`}>
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="h-48 w-full object-contain cursor-pointer"
                  />
                </Link>

                {/*  Wishlist button */}
                <div
                  className="absolute top-2 right-2 z-10 cursor-pointer"
                  onClick={() => {
                    toggleWishlist(deal);
                    if (isWishlisted) {
                      toast.info(`${deal.title} removed from wishlist`);
                    } else {
                      toast.success(`${deal.title} added to wishlist`);
                    }
                  }}
                >
                  {isWishlisted ? (
                    <Heart className="text-red-500 fill-red-500" size={20} />
                  ) : (
                    <Heart
                      className="text-white stroke-[2] stroke-gray-600"
                      size={20}
                    />
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4 flex-grow flex flex-col items-center justify-between">
                  <div className="text-center mb-2">
                    <p className="text-lg font-semibold text-gray-800">
                      {deal.title}
                    </p>
                    <span className="text-pink-600 font-bold text-sm mt-1 block">
                      ₹{deal.price}
                    </span>
                  </div>

                  {/*  Add to Cart */}
                  <button
                    onClick={() => {
                      addToCart(deal);
                      toast.success(`${deal.title} added to cart!`);
                    }}
                    className="mt-2 bg-pink-600 hover:bg-pink-700 text-white font-medium px-4 py-2 rounded-full text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BestDeals;
