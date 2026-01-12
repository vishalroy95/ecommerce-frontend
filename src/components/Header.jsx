// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { FaHeart, FaShoppingCart } from "react-icons/fa";
// import { useWishlist } from "../context/WishlistContext";
// import { useCart } from "../context/CartContext";
// import AccountDropdown from "../pages/AccountDropdown";
// import useProducts from "../hooks/useProducts";

// const Header = () => {
//   const { cart } = useCart();
//   const { wishlist } = useWishlist();
//   const { products } = useProducts();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeIndex, setActiveIndex] = useState(-1);
//   const [showUserDropdown, setShowUserDropdown] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dropdownRef = useRef(null);

//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     if (location.pathname === "/") {
//       setSearchTerm("");
//     }
//   }, [location.pathname]);

//   // 🟢 Close dropdown when clicked outside
//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setShowUserDropdown(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const filteredSuggestions = products.filter((p) =>
//     p.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSearchKeyDown = (e) => {
//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       setActiveIndex((prev) =>
//         prev < filteredSuggestions.length - 1 ? prev + 1 : 0
//       );
//     } else if (e.key === "ArrowUp") {
//       e.preventDefault();
//       setActiveIndex((prev) =>
//         prev > 0 ? prev - 1 : filteredSuggestions.length - 1
//       );
//     } else if (e.key === "Enter") {
//       e.preventDefault();
//       if (activeIndex >= 0 && filteredSuggestions[activeIndex]) {
//         const selected = filteredSuggestions[activeIndex];
//         navigate(`/search?q=${encodeURIComponent(selected.title)}`);
//         setSearchTerm("");
//       } else if (searchTerm.trim() !== "") {
//         navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
//         setSearchTerm("");
//       }
//       setActiveIndex(-1);
//     }
//   };

//   const totalCartItems = cart.reduce(
//     (sum, item) => sum + (item.quantity || 1),
//     0
//   );
//   const totalWishlistItems = wishlist.length;

//   return (
//     <header className="bg-white shadow-md py-3 px-6 sticky top-0 z-50">
//       <div className="max-w-[1280px] mx-auto flex items-center justify-between relative">
//         {/* Logo */}
//         <Link to="/" className="text-pink-600 font-bold text-2xl tracking-wide">
//           IDEACRAFT
//         </Link>

//         {/* 🔍 Search with Suggestions */}
//         <div className="w-1/2 relative">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setActiveIndex(-1);
//             }}
//             onKeyDown={handleSearchKeyDown}
//             placeholder="Search for beauty products, brands, etc..."
//             className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
//           />

//           {searchTerm && (
//             <div className="absolute top-12 left-0 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
//               {filteredSuggestions.length > 0 ? (
//                 filteredSuggestions.slice(0, 6).map((p, idx) => (
//                   <div
//                     key={p._id}
//                     className={`px-4 py-2 cursor-pointer ${
//                       idx === activeIndex
//                         ? "bg-gray-200"
//                         : "hover:bg-gray-100"
//                     }`}
//                     onClick={() => {
//                       navigate(`/search?q=${encodeURIComponent(p.title)}`);
//                       setSearchTerm("");
//                       setActiveIndex(-1);
//                     }}
//                   >
//                     {p.title}
//                   </div>
//                 ))
//               ) : (
//                 <div className="px-4 py-2 text-gray-500">
//                   No suggestions found
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Icons */}
//         <div className="flex items-center gap-6 text-gray-600 text-xl relative">
//           {/* Wishlist */}
//           <Link
//             to="/wishlist"
//             className="relative hover:text-pink-600 transition"
//           >
//             <FaHeart />
//             {totalWishlistItems > 0 && (
//               <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
//                 {totalWishlistItems}
//               </span>
//             )}
//           </Link>

//           {/* Cart */}
//           <Link
//             to="/cart"
//             className="relative hover:text-pink-600 transition"
//           >
//             <FaShoppingCart />
//             {totalCartItems > 0 && (
//               <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
//                 {totalCartItems}
//               </span>
//             )}
//           </Link>

//           {/* 👤 User */}
//           {user ? (
//             <AccountDropdown />
//           ) : (
//             <div className="relative" ref={dropdownRef}>
//               <div
//                 onClick={() => setShowUserDropdown((prev) => !prev)}
//                 className="cursor-pointer hover:text-pink-600 transition"
//               >
//                 {/* user icon */}
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M5.121 17.804A9.978 9.978 0 0112 15c2.21 0 4.25.713 5.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                   />
//                 </svg>
//               </div>
//               {showUserDropdown && (
//                 <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow-lg border rounded-md py-2 z-[1000]">
//                   <Link
//                     to="/login"
//                     className="block px-4 py-2 text-gray-700 hover:bg-pink-100"
//                     onClick={() => setShowUserDropdown(false)}
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     to="/signup"
//                     className="block px-4 py-2 text-gray-700 hover:bg-pink-100"
//                     onClick={() => setShowUserDropdown(false)}
//                   >
//                     Sign Up
//                   </Link>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;






// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { FaHeart, FaShoppingCart } from "react-icons/fa";
// import { useWishlist } from "../context/WishlistContext";
// import { useCart } from "../context/CartContext";
// import AccountDropdown from "../pages/AccountDropdown";
// import useProducts from "../hooks/useProducts";

// const Header = () => {
//   const { cart } = useCart();
//   const { wishlist } = useWishlist();
//   const { products } = useProducts();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeSuggestion, setActiveSuggestion] = useState(-1);
//   const [showUserDropdown, setShowUserDropdown] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const mobileDropdownRef = useRef(null);
//   const desktopDropdownRef = useRef(null);
//   const searchRef = useRef(null);

//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     if (location.pathname === "/") setSearchTerm("");
//   }, [location.pathname]);

//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (
//         mobileDropdownRef.current &&
//         !mobileDropdownRef.current.contains(e.target) &&
//         desktopDropdownRef.current &&
//         !desktopDropdownRef.current.contains(e.target) &&
//         searchRef.current &&
//         !searchRef.current.contains(e.target)
//       ) {
//         setShowUserDropdown(false);
//         setActiveSuggestion(-1);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const totalCartItems = cart.reduce(
//     (sum, item) => sum + (item.quantity || 1),
//     0
//   );
//   const totalWishlistItems = wishlist.length;

//   // 🔍 DERIVED SEARCH SUGGESTIONS (OLD WORKING LOGIC)
//   const filteredSuggestions = searchTerm
//     ? products.filter((p) =>
//         p.title?.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : [];

//   // ⌨️ KEYBOARD HANDLER
//   const handleKeyDown = (e) => {
//     if (!filteredSuggestions.length) return;

//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       setActiveSuggestion((prev) =>
//         prev < filteredSuggestions.length - 1 ? prev + 1 : 0
//       );
//     }

//     if (e.key === "ArrowUp") {
//       e.preventDefault();
//       setActiveSuggestion((prev) =>
//         prev > 0 ? prev - 1 : filteredSuggestions.length - 1
//       );
//     }

//     if (e.key === "Enter" && activeSuggestion >= 0) {
//       e.preventDefault();
//       navigate(`/product/${filteredSuggestions[activeSuggestion].id}`);
//       setSearchTerm("");
//       setActiveSuggestion(-1);
//     }
//   };

//   const UserIcon = ({ refProp }) => (
//     <div className="relative" ref={refProp}>
//       <svg
//         onClick={() => setShowUserDropdown((p) => !p)}
//         className="w-5 h-5 cursor-pointer"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         viewBox="0 0 24 24"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M5.121 17.804A9.978 9.978 0 0112 15c2.21 0 4.25.713 5.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//         />
//       </svg>

//       {showUserDropdown && (
//         <div className="absolute right-0 top-8 w-40 bg-white shadow-lg border rounded-md py-2 z-[9999]">
//           <div
//             onClick={() => {
//               setShowUserDropdown(false);
//               navigate("/login");
//             }}
//             className="px-4 py-2 hover:bg-pink-100 cursor-pointer"
//           >
//             Login
//           </div>
//           <div
//             onClick={() => {
//               setShowUserDropdown(false);
//               navigate("/signup");
//             }}
//             className="px-4 py-2 hover:bg-pink-100 cursor-pointer"
//           >
//             Sign Up
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <header className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-[1280px] mx-auto px-4 py-3 md:grid md:grid-cols-4 md:items-center md:gap-6">
//         {/* LOGO */}
//         <div className="flex items-center justify-between md:justify-start md:col-span-1">
//           <Link to="/" className="text-pink-600 font-bold text-2xl">
//             IDEACRAFT
//           </Link>

//           {/* MOBILE ICONS */}
//           <div className="flex items-center gap-5 text-gray-600 text-xl md:hidden">
//             <Link to="/wishlist" className="relative">
//               <FaHeart />
//               {totalWishlistItems > 0 && (
//                 <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs px-2 rounded-full">
//                   {totalWishlistItems}
//                 </span>
//               )}
//             </Link>

//             <Link to="/cart" className="relative">
//               <FaShoppingCart />
//               {totalCartItems > 0 && (
//                 <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs px-2 rounded-full">
//                   {totalCartItems}
//                 </span>
//               )}
//             </Link>

//             {user ? (
//               <AccountDropdown />
//             ) : (
//               <UserIcon refProp={mobileDropdownRef} />
//             )}
//           </div>
//         </div>

//         {/* SEARCH */}
//         <div className="mt-3 md:mt-0 md:col-span-2 relative" ref={searchRef}>
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setActiveSuggestion(-1);
//             }}
//             onKeyDown={handleKeyDown}
//             placeholder="Search for beauty products, brands, etc..."
//             className="w-full px-5 py-2 border border-pink-500 rounded-full
//                        focus:outline-none focus:ring-2 focus:ring-pink-500"
//           />

//           {searchTerm && (
//             <div className="absolute z-50 w-full bg-white border border-pink-500 rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
//               {filteredSuggestions.length > 0 ? (
//                 filteredSuggestions.slice(0, 5).map((p, index) => (
//                   <div
//                     key={p.id}
//                     onClick={() => {
//                       navigate(`/product/${p.id}`);
//                       setSearchTerm("");
//                       setActiveSuggestion(-1);
//                       document.activeElement.blur();
//                     }}
//                     className={`px-4 py-2 cursor-pointer ${
//                       index === activeSuggestion
//                         ? "bg-pink-200"
//                         : "hover:bg-pink-100"
//                     }`}
//                   >
//                     {p.title}
//                   </div>
//                 ))
//               ) : (
//                 <div className="px-4 py-2 text-gray-500">
//                   No suggestions found
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* DESKTOP ICONS */}
//         <div className="hidden md:flex justify-end gap-5 text-gray-600 text-xl">
//           <Link to="/wishlist" className="relative">
//             <FaHeart />
//             {totalWishlistItems > 0 && (
//               <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs px-2 rounded-full">
//                 {totalWishlistItems}
//               </span>
//             )}
//           </Link>

//           <Link to="/cart" className="relative">
//             <FaShoppingCart />
//             {totalCartItems > 0 && (
//               <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs px-2 rounded-full">
//                 {totalCartItems}
//               </span>
//             )}
//           </Link>

//           {user ? (
//             <AccountDropdown />
//           ) : (
//             <UserIcon refProp={desktopDropdownRef} />
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;





// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { FaHeart, FaShoppingCart } from "react-icons/fa";
// import { useWishlist } from "../context/WishlistContext";
// import { useCart } from "../context/CartContext";
// import AccountDropdown from "../pages/AccountDropdown";
// import useProducts from "../hooks/useProducts";

// const Header = () => {
//   const { cart } = useCart();
//   const { wishlist } = useWishlist();
//   const { products } = useProducts();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeIndex, setActiveIndex] = useState(-1);
//   const [showUserDropdown, setShowUserDropdown] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const dropdownRef = useRef(null);

//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     if (location.pathname === "/") setSearchTerm("");
//   }, [location.pathname]);

//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setShowUserDropdown(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const filteredSuggestions = products.filter((p) =>
//     p.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSearchKeyDown = (e) => {
//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       setActiveIndex((prev) =>
//         prev < filteredSuggestions.length - 1 ? prev + 1 : 0
//       );
//     } else if (e.key === "ArrowUp") {
//       e.preventDefault();
//       setActiveIndex((prev) =>
//         prev > 0 ? prev - 1 : filteredSuggestions.length - 1
//       );
//     } else if (e.key === "Enter") {
//       e.preventDefault();
//       if (activeIndex >= 0 && filteredSuggestions[activeIndex]) {
//         navigate(
//           `/search?q=${encodeURIComponent(
//             filteredSuggestions[activeIndex].title
//           )}`
//         );
//       } else if (searchTerm.trim()) {
//         navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
//       }
//       setSearchTerm("");
//       setActiveIndex(-1);
//     }
//   };

//   const totalCartItems = cart.reduce(
//     (sum, item) => sum + (item.quantity || 1),
//     0
//   );
//   const totalWishlistItems = wishlist.length;

//   return (
//     <header className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-[1280px] mx-auto px-4 py-3">
//         {/* TOP ROW */}
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <Link to="/" className="text-pink-600 font-bold text-2xl">
//             IDEACRAFT
//           </Link>

//           {/* Icons */}
//           <div className="flex items-center gap-5 text-gray-600 text-xl">
//             <Link to="/wishlist" className="relative">
//               <FaHeart />
//               {totalWishlistItems > 0 && (
//                 <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs px-2 rounded-full">
//                   {totalWishlistItems}
//                 </span>
//               )}
//             </Link>

//             <Link to="/cart" className="relative">
//               <FaShoppingCart />
//               {totalCartItems > 0 && (
//                 <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs px-2 rounded-full">
//                   {totalCartItems}
//                 </span>
//               )}
//             </Link>

//             {user ? (
//               <AccountDropdown />
//             ) : (
//               <div className="relative" ref={dropdownRef}>
//                 <svg
//                   onClick={() =>
//                     setShowUserDropdown((prev) => !prev)
//                   }
//                   className="w-5 h-5 cursor-pointer"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M5.121 17.804A9.978 9.978 0 0112 15c2.21 0 4.25.713 5.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                   />
//                 </svg>

//                 {showUserDropdown && (
//                   <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border rounded-md py-2 z-[1000]">
//                     <Link
//                       to="/login"
//                       className="block px-4 py-2 hover:bg-pink-100"
//                       onClick={() => setShowUserDropdown(false)}
//                     >
//                       Login
//                     </Link>
//                     <Link
//                       to="/signup"
//                       className="block px-4 py-2 hover:bg-pink-100"
//                       onClick={() => setShowUserDropdown(false)}
//                     >
//                       Sign Up
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* SEARCH (FULL WIDTH ON MOBILE, CENTERED ON DESKTOP) */}
//          <div className="mt-3 relative md:max-w-xl">
//            <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setActiveIndex(-1);
//             }}
//             onKeyDown={handleSearchKeyDown}
//             placeholder="Search for beauty products, brands, etc..."
//             className="w-full px-4 py-2 border border-gray-300 rounded-full
//                        focus:outline-none focus:ring-2 focus:ring-pink-500"
//           />

//           {searchTerm && (
//             <div className="absolute top-12 left-0 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
//               {filteredSuggestions.length > 0 ? (
//                 filteredSuggestions.slice(0, 6).map((p, idx) => (
//                   <div
//                     key={p._id}
//                     className={`px-4 py-2 cursor-pointer ${
//                       idx === activeIndex
//                         ? "bg-gray-200"
//                         : "hover:bg-gray-100"
//                     }`}
//                     onClick={() => {
//                       navigate(
//                         `/search?q=${encodeURIComponent(p.title)}`
//                       );
//                       setSearchTerm("");
//                       setActiveIndex(-1);
//                       document.activeElement.blur();
//                     }}
//                   >
//                     {p.title}
//                   </div>
//                 ))
//               ) : (
//                 <div className="px-4 py-2 text-gray-500">
//                   No suggestions found
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;




import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import AccountDropdown from "../pages/AccountDropdown";
import useProducts from "../hooks/useProducts";

const Header = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { products } = useProducts();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (location.pathname === "/") setSearchTerm("");
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSuggestions = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && filteredSuggestions[activeIndex]) {
        navigate(
          `/search?q=${encodeURIComponent(
            filteredSuggestions[activeIndex].title
          )}`
        );
      } else if (searchTerm.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      }
      setSearchTerm("");
      setActiveIndex(-1);
    }
  };

  const totalCartItems = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );
  const totalWishlistItems = wishlist.length;

  return (
    <header className="bg-white shadow-md py-3 px-4 sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto relative">

        {/* ===== TOP ROW (DESKTOP SAME) ===== */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-pink-600 font-bold text-2xl tracking-wide"
          >
            IDEACRAFT
          </Link>

          {/* Search – desktop only */}
          <div className="hidden sm:block w-1/2 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setActiveIndex(-1);
              }}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search for beauty products, brands, etc..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />

            {searchTerm && (
              <div className="absolute top-12 left-0 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
                {filteredSuggestions.slice(0, 6).map((p, idx) => (
                  <div
                    key={p._id}
                    className={`px-4 py-2 cursor-pointer ${
                      idx === activeIndex
                        ? "bg-gray-200"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      navigate(`/search?q=${encodeURIComponent(p.title)}`);
                      setSearchTerm("");
                      setActiveIndex(-1);
                    }}
                  >
                    {p.title}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6 text-gray-600 text-xl">
            <Link to="/wishlist" className="relative hover:text-pink-600">
              <FaHeart />
              {totalWishlistItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative hover:text-pink-600">
              <FaShoppingCart />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalCartItems}
                </span>
              )}
            </Link>

            {user ? (
              <AccountDropdown />
            ) : (
              <div className="relative" ref={dropdownRef}>
                <svg
                  onClick={() => setShowUserDropdown((p) => !p)}
                  className="w-5 h-5 cursor-pointer hover:text-pink-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A9.978 9.978 0 0112 15c2.21 0 4.25.713 5.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                {showUserDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow-lg border rounded-md py-2 z-[1000]">
                    <Link to="/login" className="block px-4 py-2 hover:bg-pink-100">
                      Login
                    </Link>
                    <Link to="/signup" className="block px-4 py-2 hover:bg-pink-100">
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ===== MOBILE SEARCH ONLY ===== */}
        <div className="sm:hidden mt-3 relative">
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => {
      setSearchTerm(e.target.value);
      setActiveIndex(-1);
    }}
    onKeyDown={handleSearchKeyDown}
    placeholder="Search products..."
    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
  />

  {searchTerm && (
    <div className="absolute top-12 left-0 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
      {filteredSuggestions.length > 0 ? (
        filteredSuggestions.slice(0, 6).map((p, idx) => (
          <div
            key={p._id}
            className={`px-4 py-2 cursor-pointer ${
              idx === activeIndex
                ? "bg-gray-200"
                : "hover:bg-gray-100"
            }`}
            onClick={() => {
              navigate(`/search?q=${encodeURIComponent(p.title)}`);
              setSearchTerm("");
              setActiveIndex(-1);
            }}
          >
            {p.title}
          </div>
        ))
      ) : (
        <div className="px-4 py-2 text-gray-500">
          No suggestions found
        </div>
      )}
    </div>
  )}
</div>

      </div>
    </header>
  );
};

export default Header;






