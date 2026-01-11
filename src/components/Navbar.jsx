// import React, { useState } from "react";
// import navItems from "../data/navitems";
// import { ChevronDown } from "lucide-react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const [openDropdown, setOpenDropdown] = useState(null);

//   return (
//     <nav className="w-full z-50 bg-black border-b border-gray-700 px-6 py-3 shadow-sm">
//       <div className="max-w-7xl mx-auto flex justify-start items-center gap-8">
//         <ul className="flex gap-6 font-medium text-white">
//           {navItems.map((item, index) => (
//             <li key={index} className="relative flex items-start">
//               {/* Wrapper div to track both button + dropdown */}
//               <div
//                 onMouseEnter={() => setOpenDropdown(index)}
//                 onMouseLeave={() => setOpenDropdown(null)}
//               >
//                 <Link
//                   to={`/category/${item.slug}`}
//                   className="flex items-center gap-1 hover:text-pink-500 px-2 py-1"
//                 >
//                   {item.name}
//                   {item.subcategories && (
//                     <ChevronDown
//                       className={`w-4 h-4 mt-0.5 transition-transform duration-200 ${
//                         openDropdown === index ? "rotate-180" : ""
//                       }`}
//                     />
//                   )}
//                 </Link>

//                 {/* Dropdown */}
//                 {item.subcategories && openDropdown === index && (
//                   <ul className="absolute top-full left-0 bg-white text-black shadow-lg rounded-md min-w-[160px] z-50">
//                     {item.subcategories.map((sub, i) => (
//                       <li
//                         key={i}
//                         className="px-4 py-2 hover:bg-gray-100 text-sm"
//                       >
//                         <Link to={`/category/${item.slug}/${sub.slug}`}>
//                           {sub.name}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



// responsive



// import React, { useState } from "react";
// import navItems from "../data/navitems";
// import { ChevronDown } from "lucide-react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const [openDropdown, setOpenDropdown] = useState(null);

//   return (
//     <nav className="w-full z-50 bg-black border-b border-gray-700 px-6 py-3 shadow-sm">
//       {/* 🔴 Desktop same | Mobile scroll enabled */}
//       <div className="max-w-7xl mx-auto flex justify-start items-center gap-8 overflow-x-auto md:overflow-visible">
//         <ul className="flex gap-6 font-medium text-white whitespace-nowrap md:whitespace-normal">
//           {navItems.map((item, index) => (
//             <li key={index} className="relative flex items-start">
//               {/* Wrapper div to track both button + dropdown */}
//               <div
//                 onMouseEnter={() => setOpenDropdown(index)}
//                 onMouseLeave={() => setOpenDropdown(null)}
//               >
//                 <Link
//                   to={`/category/${item.slug}`}
//                   className="flex items-center gap-1 hover:text-pink-500 px-2 py-1"
//                 >
//                   {item.name}
//                   {item.subcategories && (
//                     <ChevronDown
//                       className={`w-4 h-4 mt-0.5 transition-transform duration-200 ${
//                         openDropdown === index ? "rotate-180" : ""
//                       }`}
//                     />
//                   )}
//                 </Link>

//                 {/* Dropdown (desktop hover works same) */}
//                 {item.subcategories && openDropdown === index && (
//                   <ul className="absolute top-full left-0 bg-white text-black shadow-lg rounded-md min-w-[160px] z-50">
//                     {item.subcategories.map((sub, i) => (
//                       <li
//                         key={i}
//                         className="px-4 py-2 hover:bg-gray-100 text-sm"
//                       >
//                         <Link to={`/category/${item.slug}/${sub.slug}`}>
//                           {sub.name}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;






import React, { useState } from "react";
import navItems from "../data/navitems";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle dropdown for mobile
  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <nav className="w-full z-50 bg-black border-b border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-white font-bold text-xl">Logo</div>

        {/* Hamburger mobile button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6 font-medium text-white">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="relative flex items-center"
              onMouseEnter={() => setOpenDropdown(index)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={`/category/${item.slug}`}
                className="flex items-center gap-1 hover:text-pink-500 px-2 py-1"
              >
                {item.name}
                {item.subcategories && (
                  <ChevronDown
                    className={`w-4 h-4 mt-0.5 transition-transform duration-200 ${
                      openDropdown === index ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Link>

              {item.subcategories && openDropdown === index && (
                <ul className="absolute top-full left-0 bg-white text-black shadow-lg rounded-md min-w-[160px] z-50">
                  {item.subcategories.map((sub, i) => (
                    <li key={i} className="px-4 py-2 hover:bg-gray-100 text-sm">
                      <Link to={`/category/${item.slug}/${sub.slug}`}>
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black text-white border-t border-gray-700">
          <ul className="flex flex-col">
            {navItems.map((item, index) => (
              <li key={index} className="border-b border-gray-800">
                <div
                  onClick={() => item.subcategories && toggleDropdown(index)}
                  className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-gray-900"
                >
                  <Link to={`/category/${item.slug}`}>{item.name}</Link>
                  {item.subcategories && (
                    <ChevronDown
                      className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                        openDropdown === index ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
                {item.subcategories && openDropdown === index && (
                  <ul className="bg-gray-900 text-gray-200">
                    {item.subcategories.map((sub, i) => (
                      <li key={i} className="px-6 py-2 hover:bg-gray-800">
                        <Link to={`/category/${item.slug}/${sub.slug}`}>
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

               
