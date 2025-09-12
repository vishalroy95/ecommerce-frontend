import React from "react";
import { useParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { useCart } from "../context/CartContext"; 
import { toast } from "react-toastify"; 

const ViewProduct = () => {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const { addToCart } = useCart(); 

  const product = products.find((p) => p._id === id);

  if (loading) return <div className="p-10 text-center text-xl">Loading...</div>;
  if (!product) return <div className="p-10 text-center text-xl">Product Not Found</div>;

  //  Order Now click handler
  const handleOrderNow = () => {
    addToCart(product, 1); // Quantity = 1
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white mt-6 shadow-md rounded-xl">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left - Image */}
        <div className="flex-1 flex items-center justify-center bg-gray-100 p-4 rounded-xl">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[400px] object-contain rounded"
          />
        </div>

        {/* Right - Details */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{product.title}</h2>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-green-600 font-semibold">
              {product.rating || 4.5}★
            </span>
            <span className="text-sm text-gray-500">(200 reviews)</span>
          </div>

          <p className="text-lg font-semibold text-gray-800 mb-2">
            ₹{product.price}
          </p>
          {product.discount > 0 && (
            <p className="text-sm text-green-600 mb-4">
              {product.discount}% OFF
            </p>
          )}

          <p className="text-sm text-gray-600 mb-6">
            {product.description ||
              "An advanced formula made for your skin's deep nourishment and glow. Dermatologically tested and safe for all skin types."}
          </p>

          {/* Highlights */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">Highlights:</h4>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>Paraben-free and 100% vegan</li>
              <li>Clinically tested for sensitive skin</li>
              <li>Long-lasting fragrance and effect</li>
              <li>Travel-friendly packaging</li>
            </ul>
          </div>

          {/* How to Use */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">How to Use:</h4>
            <p className="text-sm text-gray-700">
              Cleanse your face, apply a small amount evenly, and massage until
              fully absorbed. Use daily for best results.
            </p>
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-2">Ingredients:</h4>
            <p className="text-sm text-gray-700">
              Aloe Vera, Vitamin C, Hyaluronic Acid, Shea Butter, Rose Extracts
            </p>
          </div>

          {/* Order Now Button */}
          {/* <button
            onClick={handleOrderNow}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Order Now
          </button> */}

     <button
  onClick={() => {
    handleOrderNow();
    toast.success("Your order has been added to cart successfully!");
  }}
  className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
>
  Order Now
</button>

        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
