// import React, { useState, useRef, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   User,
//   LogOut,
//   CreditCard,
//   MapPin,
//   ShoppingBag,
//   Wallet
// } from "lucide-react";

// const AccountDropdown = () => {
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef();
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button onClick={() => setOpen(!open)} className="flex items-center gap-1">
//         <User className="w-6 h-6 text-gray-700 hover:text-pink-600 transition" />
//       </button>

//       {open && (
//         <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-xl rounded-lg z-50 text-sm text-gray-700">
//           <div className="px-4 py-3 border-b text-gray-800 font-semibold flex items-center gap-2">
//             <User className="w-4 h-4" />
//             Hello, {user?.name?.split(" ")[0] || "User"}
//           </div>
//           <ul className="py-1">
//             <li>
//               <Link to="/account/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
//                 <User className="w-4 h-4" /> My Profile
//               </Link>
//             </li>
//             <li>
//               <Link to="/account/orders" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
//                 <ShoppingBag className="w-4 h-4" /> My Orders
//               </Link>
//             </li>
//             <li>
//               <Link to="/account/addresses" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
//                 <MapPin className="w-4 h-4" /> Addresses
//               </Link>
//             </li>
//             <li>
//               <Link to="/account/wallet" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
//                 <Wallet className="w-4 h-4" /> Wallet
//               </Link>
//             </li>
//             <li>
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-red-50 text-red-500"
//               >
//                 <LogOut className="w-4 h-4" /> Logout
//               </button>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AccountDropdown;



import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  LogOut,
  MapPin,
  ShoppingBag,
  Wallet
} from "lucide-react";

const AccountDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setOpen(false); 
    navigate("/");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1">
        <User className="w-6 h-6 text-gray-700 hover:text-pink-600 transition" />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-xl rounded-lg z-50 text-sm text-gray-700"
          onMouseLeave={() => setOpen(false)} // close when cursor leaves
        >
          <div className="px-4 py-3 border-b text-gray-800 font-semibold flex items-center gap-2">
            <User className="w-4 h-4" />
            Hello, {user?.name?.split(" ")[0] || "User"}
          </div>
          <ul className="py-1">
            <li>
              <Link
                to="/account/profile"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)} // close on click
              >
                <User className="w-4 h-4" /> My Profile
              </Link>
            </li>
            <li>
              <Link
                to="/account/orders"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <ShoppingBag className="w-4 h-4" /> My Orders
              </Link>
            </li>
            <li>
              <Link
                to="/account/addresses"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <MapPin className="w-4 h-4" /> Addresses
              </Link>
            </li>
            <li>
              <Link
                to="/account/wallet"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <Wallet className="w-4 h-4" /> Wallet
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-red-50 text-red-500"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
