// src/pages/SubCategoryPage.jsx
import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import banner from "../assets/home-banner.jpg";
import useProducts from "../hooks/useProducts";
import { toast } from "react-toastify";

const SubCategoryPage = () => {
  const { categorySlug, subCategorySlug } = useParams();
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  const [selectedFilters, setSelectedFilters] = useState({});
  const [sortOption, setSortOption] = useState("default");

  const { products, loading } = useProducts();

  const isWishlisted = (product) =>
    wishlist.some((item) => item.productId?._id === product._id);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value,
    }));
  };

  const handleView = (id) => {
    navigate(`/product/${id}`);
  };

  const filteredProducts = products
    .filter(
      (product) =>
        product.categorySlug === categorySlug &&
        product.subCategorySlug === subCategorySlug
    )
    .filter((product) =>
      Object.entries(selectedFilters).every(([key, value]) => {
        if (!value) return true;
        return product[key] === value;
      })
    );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "priceLowToHigh") return a.price - b.price;
    if (sortOption === "priceHighToLow") return b.price - a.price;
    return 0;
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <img src={banner} alt="Banner" className="w-full mb-4" />
      <div className="flex flex-col md:flex-row">
        {/* Filters */}
        <div className="w-full md:w-1/5 p-4 bg-white rounded-md shadow-md space-y-4">
          <h2 className="text-xl font-semibold mb-2">Filters</h2>

          <div>
            <h3 className="font-medium mb-1">Skin Type</h3>
            {["Oily", "Dry", "Normal"].map((type) => (
              <button
                key={type}
                className={`block w-full text-left px-2 py-1 rounded ${
                  selectedFilters.skinType === type
                    ? "bg-pink-200"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleFilterChange("skinType", type)}
              >
                {type}
              </button>
            ))}
          </div>

          <div>
            <h3 className="font-medium mb-1">Concern</h3>
            {["Acne", "Wrinkles", "Dark Circles"].map((concern) => (
              <button
                key={concern}
                className={`block w-full text-left px-2 py-1 rounded ${
                  selectedFilters.concern === concern
                    ? "bg-pink-200"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleFilterChange("concern", concern)}
              >
                {concern}
              </button>
            ))}
          </div>
        </div>

        {/* Product + Sorting */}
        <div className="w-full md:w-4/5 p-4">
          {/* Sort Option */}
          <div className="flex justify-end mb-4">
            <select
              className="p-2 border rounded text-sm"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Sort by: Default</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
            </select>
          </div>

          {/* Products */}
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : sortedProducts.length === 0 ? (
            <p className="text-red-600 text-lg">No Products Found</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sortedProducts.map((deal) => (
                <div
                  key={deal._id}
                  className="relative bg-white p-4 rounded-md shadow group hover:shadow-lg transition duration-300"
                >
                  {/* Wishlist icon */}
                  {/* <div
                    className="absolute top-2 right-2 z-10 cursor-pointer"
                    onClick={() => toggleWishlist(deal)}
                  >
                    {isWishlisted(deal) ? (
                      <Heart className="text-red-500 fill-red-500" size={20} />
                    ) : (
                      <Heart
                        className="text-white stroke-[2] stroke-gray-600"
                        size={20}
                      />
                    )}
                  </div> */}


                  <div
  className="absolute top-2 right-2 z-10 cursor-pointer"
  onClick={() => {
    toggleWishlist(deal);
    if (isWishlisted(deal)) {
      toast.info(`${deal.title} removed from wishlist`);
    } else {
      toast.success(`${deal.title} added to wishlist`);
    }
  }}
>
  {isWishlisted(deal) ? (
    <Heart className="text-red-500 fill-red-500" size={20} />
  ) : (
    <Heart
      className="text-white stroke-[2] stroke-gray-600"
      size={20}
    />
  )}
</div>

                  {/* Image and View Button */}
                  <div className="relative cursor-pointer">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-40 object-cover rounded"
                    />
                    <button
                      className="w-full bg-black text-white text-sm py-1 rounded-md opacity-0 group-hover:opacity-100 transition duration-300"
                      onClick={() => handleView(deal._id)}
                    >
                      View Product
                    </button>
                  </div>

                  <div className="mt-2">
                    <h3 className="text-sm font-medium">{deal.title}</h3>
                    <p className="text-gray-500 text-xs">{deal.description}</p>
                    <p className="text-pink-600 font-bold mt-1">
                      ₹{deal.price}
                    </p>
                  </div>

                  {/* <button
                    className="mt-3 w-full bg-pink-600 text-white py-1 rounded hover:bg-pink-700 transition"
                    onClick={() => addToCart(deal)}
                  >
                    Add to Cart
                  </button> */}

                 <button
  className="mt-3 w-full bg-pink-600 text-white py-1 rounded hover:bg-pink-700 transition"
  onClick={() => {
    addToCart(deal);
    toast.success(`${deal.title} added to cart`);
  }}
>
  Add to Cart
</button>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryPage;
