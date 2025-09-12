// import React, { useContext, useState, useMemo } from "react";
// import { Heart, Filter } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { CartContext } from "../context/CartContext";
// import { WishlistContext } from "../context/WishlistContext";
// import useProducts from "../hooks/useProducts";

// const SearchPage = () => {
//   const { addToCart } = useContext(CartContext);
//   const { wishlist, toggleWishlist } = useContext(WishlistContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [showFilter, setShowFilter] = useState(false);
//   const [sortOpen, setSortOpen] = useState(false);
//   const [selectedFilters, setSelectedFilters] = useState({});
//   const [sortOption, setSortOption] = useState("default");

//   const { products, loading } = useProducts();
//   const query = new URLSearchParams(location.search).get("q") || "";

//   const isWishlisted = (product) =>
//     wishlist.some((item) => item.productId?._id === product._id);

//   const handleView = (id) => {
//     navigate(`/product/${id}`);
//   };

//   const handleFilterChange = (filterType, value) => {
//     setSelectedFilters((prev) => ({
//       ...prev,
//       [filterType]: value || null,
//     }));
//   };

//   // 🔍 Base search (only if query hai)
//   const searchedResults = useMemo(() => {
//     if (query) {
//       return products.filter((p) =>
//         p.title.toLowerCase().includes(query.toLowerCase())
//       );
//     }
//     return products;
//   }, [products, query]);

//   // ✅ Final filtered + sorted results
//   const filteredProducts = useMemo(() => {
//     let result = [...products];

//     if (selectedFilters && Object.keys(selectedFilters).length > 0) {
//       result = result.filter((product) =>
//         Object.entries(selectedFilters).every(([key, value]) => {
//           if (!value) return true;
//           if (key === "price") {
//             return Number(product.price) <= Number(value);
//           }
//           return product[key] === value;
//         })
//       );
//     }

//     if (!selectedFilters || Object.values(selectedFilters).every((v) => !v)) {
//       result = searchedResults;
//     }

//     if (sortOption === "priceLowToHigh") {
//       result.sort((a, b) => Number(a.price) - Number(b.price));
//     } else if (sortOption === "priceHighToLow") {
//       result.sort((a, b) => Number(b.price) - Number(a.price));
//     } else if (sortOption === "alphabeticalAZ") {
//       result.sort((a, b) => a.title.localeCompare(b.title));
//     } else if (sortOption === "alphabeticalZA") {
//       result.sort((a, b) => b.title.localeCompare(a.title));
//     }

//     return result;
//   }, [products, searchedResults, selectedFilters, sortOption]);

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       {/* Top bar with filter + sort */}
//       <div className="flex justify-between items-center px-4 py-3 bg-white shadow">
//         <button
//           className="flex items-center gap-2 text-gray-700 font-medium"
//           onClick={() => setShowFilter(!showFilter)}
//         >
//           <Filter size={18} /> Filter
//         </button>

//         <div className="relative">
//           <button
//             className="border px-3 py-1 rounded text-sm bg-white"
//             onClick={() => setSortOpen(!sortOpen)}
//           >
//             {sortOption === "default"
//               ? "Sort by"
//               : sortOption === "priceLowToHigh"
//               ? "Price: Low to High"
//               : sortOption === "priceHighToLow"
//               ? "Price: High to Low"
//               : sortOption === "alphabeticalAZ"
//               ? "Alphabetically, A-Z"
//               : "Alphabetically, Z-A"}
//           </button>

//           {sortOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
//               <p
//                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                 onClick={() => {
//                   setSortOption("default");
//                   setSortOpen(false);
//                 }}
//               >
//                 Best Selling
//               </p>
//               <p
//                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                 onClick={() => {
//                   setSortOption("alphabeticalAZ");
//                   setSortOpen(false);
//                 }}
//               >
//                 Alphabetically, A-Z
//               </p>
//               <p
//                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                 onClick={() => {
//                   setSortOption("alphabeticalZA");
//                   setSortOpen(false);
//                 }}
//               >
//                 Alphabetically, Z-A
//               </p>
//               <p
//                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                 onClick={() => {
//                   setSortOption("priceLowToHigh");
//                   setSortOpen(false);
//                 }}
//               >
//                 Price: Low to High
//               </p>
//               <p
//                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                 onClick={() => {
//                   setSortOption("priceHighToLow");
//                   setSortOpen(false);
//                 }}
//               >
//                 Price: High to Low
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Main layout: Sidebar + Products */}
//       <div className="flex">
//         {/* Sidebar (Filter) */}
//         {showFilter && (
//           <div className="w-72 bg-white shadow-lg p-4 overflow-y-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold">FILTER</h2>
//               <button onClick={() => setShowFilter(false)}>X</button>
//             </div>

//             {/* Availability */}
//             <div>
//               <p className="font-medium mb-1">Availability</p>
//               <label className="flex items-center gap-2 mb-1">
//                 <input
//                   type="checkbox"
//                   checked={selectedFilters.stock === "in"}
//                   onChange={() =>
//                     handleFilterChange(
//                       "stock",
//                       selectedFilters.stock === "in" ? null : "in"
//                     )
//                   }
//                 />
//                 In Stock
//               </label>
//               <label className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedFilters.stock === "out"}
//                   onChange={() =>
//                     handleFilterChange(
//                       "stock",
//                       selectedFilters.stock === "out" ? null : "out"
//                     )
//                   }
//                 />
//                 Out of Stock
//               </label>
//             </div>

//             {/* Category */}
//             <div className="mt-4">
//               <p className="font-medium mb-1">Category</p>
//               {[...new Set(products.map((p) => p.category))].map((cat) => (
//                 <label key={cat} className="flex items-center gap-2 mb-1">
//                   <input
//                     type="checkbox"
//                     checked={selectedFilters.category === cat}
//                     onChange={() =>
//                       handleFilterChange(
//                         "category",
//                         selectedFilters.category === cat ? null : cat
//                       )
//                     }
//                   />
//                   {cat}
//                 </label>
//               ))}
//             </div>

//             {/* Subcategory */}
//             <div className="mt-4">
//               <p className="font-medium mb-1">Subcategory</p>
//               {[...new Set(products.map((p) => p.subcategory))].map((sub) => (
//                 <label key={sub} className="flex items-center gap-2 mb-1">
//                   <input
//                     type="checkbox"
//                     checked={selectedFilters.subcategory === sub}
//                     onChange={() =>
//                       handleFilterChange(
//                         "subcategory",
//                         selectedFilters.subcategory === sub ? null : sub
//                       )
//                     }
//                   />
//                   {sub}
//                 </label>
//               ))}
//             </div>

//             {/* Price filter */}
//             <div className="mt-4">
//               <p className="font-medium mb-1">Price</p>
//               <input
//                 type="range"
//                 min="0"
//                 max="5000"
//                 value={selectedFilters.price || 5000}
//                 onChange={(e) =>
//                   handleFilterChange("price", Number(e.target.value))
//                 }
//               />
//               <p className="text-sm">
//                 Up to: ₹{selectedFilters.price || "All"}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Products grid */}
//         <div
//           className={`flex-1 p-4 grid ${
//             showFilter
//               ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
//               : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
//           } gap-4`}
//         >
//           {loading ? (
//             <p className="col-span-full text-center text-gray-500">Loading...</p>
//           ) : filteredProducts.length === 0 ? (
//             <p className="col-span-full text-center text-red-500">
//               No Products Found
//             </p>
//           ) : (
//             filteredProducts.map((deal) => (
//               <ProductCard
//                 key={deal._id}
//                 deal={deal}
//                 isWishlisted={isWishlisted}
//                 toggleWishlist={toggleWishlist}
//                 handleView={handleView}
//                 addToCart={addToCart}
//               />
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProductCard = ({
//   deal,
//   isWishlisted,
//   toggleWishlist,
//   handleView,
//   addToCart,
// }) => (
//   <div className="relative bg-white p-4 rounded-md shadow group hover:shadow-lg transition">
//     <div
//       className="absolute top-2 right-2 z-10 cursor-pointer"
//       onClick={() => toggleWishlist(deal)}
//     >
//       {isWishlisted(deal) ? (
//         <Heart className="text-red-500 fill-red-500" size={20} />
//       ) : (
//         <Heart className="text-gray-600" size={20} />
//       )}
//     </div>

//     <div className="relative cursor-pointer">
//       <img
//         src={deal.image}
//         alt={deal.title}
//         className="w-full h-48 object-contain rounded"
//       />
//       <button
//         className="w-full bg-black text-white text-sm py-1 rounded-md opacity-0 group-hover:opacity-100 transition"
//         onClick={() => handleView(deal._id)}
//       >
//         View Product
//       </button>
//     </div>

//     <div className="mt-2">
//       <h3 className="text-sm font-medium">{deal.title}</h3>
//       <p className="text-pink-600 font-bold mt-1">₹{deal.price}</p>
//     </div>

//     <button
//       className="mt-3 w-full bg-pink-600 text-white py-1 rounded hover:bg-pink-700 transition"
//       onClick={() => addToCart(deal)}
//     >
//       Add to Cart
//     </button>
//   </div>
// );

// export default SearchPage;





import React, { useContext, useState, useMemo } from "react";
import { Heart, Filter } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import useProducts from "../hooks/useProducts";
import { toast } from "react-toastify";

const SearchPage = () => {
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [showFilter, setShowFilter] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [sortOption, setSortOption] = useState("default");

  const { products, loading } = useProducts();
  const query = new URLSearchParams(location.search).get("q") || "";

  const isWishlisted = (product) =>
    wishlist.some((item) => item.productId?._id === product._id);

  const handleView = (id) => {
    navigate(`/product/${id}`);
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value || null,
    }));
  };

  // 🔍 Base search
  const searchedResults = useMemo(() => {
    if (query) {
      return products.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    return products;
  }, [products, query]);

  // Final filtered + sorted results
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedFilters && Object.keys(selectedFilters).length > 0) {
      result = result.filter((product) =>
        Object.entries(selectedFilters).every(([key, value]) => {
          if (!value) return true;
          if (key === "price") {
            return Number(product.price) <= Number(value);
          }
          return product[key] === value;
        })
      );
    }

    if (!selectedFilters || Object.values(selectedFilters).every((v) => !v)) {
      result = searchedResults;
    }

    if (sortOption === "priceLowToHigh") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortOption === "priceHighToLow") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortOption === "alphabeticalAZ") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "alphabeticalZA") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [products, searchedResults, selectedFilters, sortOption]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Top bar with filter + sort */}
      <div className="flex justify-between items-center px-4 py-3 bg-white shadow">
        <button
          className="flex items-center gap-2 text-gray-700 font-medium"
          onClick={() => setShowFilter(!showFilter)}
        >
          <Filter size={18} /> Filter
        </button>

        <div className="relative">
          <button
            className="border px-3 py-1 rounded text-sm bg-white"
            onClick={() => setSortOpen(!sortOpen)}
          >
            {sortOption === "default"
              ? "Sort by"
              : sortOption === "priceLowToHigh"
              ? "Price: Low to High"
              : sortOption === "priceHighToLow"
              ? "Price: High to Low"
              : sortOption === "alphabeticalAZ"
              ? "Alphabetically, A-Z"
              : "Alphabetically, Z-A"}
          </button>

          {sortOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
              <p
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSortOption("default");
                  setSortOpen(false);
                }}
              >
                Best Selling
              </p>
              <p
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSortOption("alphabeticalAZ");
                  setSortOpen(false);
                }}
              >
                Alphabetically, A-Z
              </p>
              <p
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSortOption("alphabeticalZA");
                  setSortOpen(false);
                }}
              >
                Alphabetically, Z-A
              </p>
              <p
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSortOption("priceLowToHigh");
                  setSortOpen(false);
                }}
              >
                Price: Low to High
              </p>
              <p
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSortOption("priceHighToLow");
                  setSortOpen(false);
                }}
              >
                Price: High to Low
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main layout: Sidebar + Products */}
      <div className="flex">
        {/* Sidebar (Filter) */}
        {showFilter && (
          <div className="w-72 bg-white shadow-lg p-4 overflow-y-auto h-[calc(100vh-64px)] sticky top-16">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">FILTER</h2>
              <button onClick={() => setShowFilter(false)}>X</button>
            </div>

            {/* Availability */}
            <div>
              <p className="font-medium mb-1">Availability</p>
              <label className="flex items-center gap-2 mb-1">
                <input
                  type="checkbox"
                  checked={selectedFilters.stock === "in"}
                  onChange={() =>
                    handleFilterChange(
                      "stock",
                      selectedFilters.stock === "in" ? null : "in"
                    )
                  }
                />
                In Stock
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedFilters.stock === "out"}
                  onChange={() =>
                    handleFilterChange(
                      "stock",
                      selectedFilters.stock === "out" ? null : "out"
                    )
                  }
                />
                Out of Stock
              </label>
            </div>

            {/* Category */}
            <div className="mt-4">
              <p className="font-medium mb-1">Category</p>
              {[...new Set(products.map((p) => p.category))].map((cat) => (
                <label key={cat} className="flex items-center gap-2 mb-1">
                  <input
                    type="checkbox"
                    checked={selectedFilters.category === cat}
                    onChange={() =>
                      handleFilterChange(
                        "category",
                        selectedFilters.category === cat ? null : cat
                      )
                    }
                  />
                  {cat}
                </label>
              ))}
            </div>

            {/* Subcategory */}
            <div className="mt-4">
              <p className="font-medium mb-1">Subcategory</p>
              {[...new Set(products.map((p) => p.subcategory))].map((sub) => (
                <label key={sub} className="flex items-center gap-2 mb-1">
                  <input
                    type="checkbox"
                    checked={selectedFilters.subcategory === sub}
                    onChange={() =>
                      handleFilterChange(
                        "subcategory",
                        selectedFilters.subcategory === sub ? null : sub
                      )
                    }
                  />
                  {sub}
                </label>
              ))}
            </div>

            {/* Price filter */}
            <div className="mt-4">
              <p className="font-medium mb-1">Price</p>
              <input
                type="range"
                min="0"
                max="5000"
                value={selectedFilters.price || 5000}
                onChange={(e) =>
                  handleFilterChange("price", Number(e.target.value))
                }
              />
              <p className="text-sm">
                Up to: ₹{selectedFilters.price || "All"}
              </p>
            </div>
          </div>
        )}

        {/* Products grid */}
        <div
          className={`flex-1 p-4 grid ${
            showFilter
              ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          } gap-4`}
        >
          {loading ? (
            <p className="col-span-full text-center text-gray-500">Loading...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="col-span-full text-center text-red-500">
              No Products Found
            </p>
          ) : (
            filteredProducts.map((deal) => (
              <ProductCard
                key={deal._id}
                deal={deal}
                isWishlisted={isWishlisted}
                toggleWishlist={toggleWishlist}
                handleView={handleView}
                addToCart={addToCart}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({
  deal,
  isWishlisted,
  toggleWishlist,
  handleView,
  addToCart,
}) => (
  // <div className="relative bg-white p-4 rounded-md shadow group hover:shadow-lg transition">
  //   <div
  //     className="absolute top-2 right-2 z-10 cursor-pointer"
  //     onClick={() => toggleWishlist(deal)}
  //   >
  //    if {isWishlisted(deal) ? (
  //       <Heart className="text-red-500 fill-red-500" size={20} />
  //     ) : (
  //       <Heart className="text-gray-600" size={20} />
  //     )}
  //   </div>


  <div className="relative bg-white p-4 rounded-md shadow group hover:shadow-lg transition">
  <div
    className="absolute top-2 right-2 z-10 cursor-pointer"
    onClick={() => {
      toggleWishlist(deal);
      if (isWishlisted(deal)) {
        toast.info(`${deal.title} removed from wishlist!`);
      } else {
        toast.success(`${deal.title} added to wishlist!`);
      }
    }}
  >
    {isWishlisted(deal) ? (
      <Heart className="text-red-500 fill-red-500" size={20} />
    ) : (
      <Heart className="text-gray-600" size={20} />
    )}
  </div>

    <div className="relative cursor-pointer">
      <img
        src={deal.image}
        alt={deal.title}
        className="w-full h-48 object-contain rounded"
      />
      <button
        className="w-full bg-black text-white text-sm py-1 rounded-md opacity-0 group-hover:opacity-100 transition"
        onClick={() => handleView(deal._id)}
      >
        View Product
      </button>
    </div>

    <div className="mt-2">
      <h3 className="text-sm font-medium">{deal.title}</h3>
      <p className="text-pink-600 font-bold mt-1">₹{deal.price}</p>
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
      addToCart(deal); // pehle cart me add karega
      toast.success(`${deal.title} added to cart!`); // 👈 toast message
  }}
    >
  Add to Cart
</button>

  </div>
);

export default SearchPage;
