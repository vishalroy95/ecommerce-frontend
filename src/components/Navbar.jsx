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



import React, { useState } from "react";
import navItems from "../data/navitems";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <nav className="w-full z-50 bg-black border-b border-gray-700 px-2 sm:px-6 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto">
        {/* Horizontal scroll container for mobile */}
        <ul className="flex gap-4 sm:gap-6 font-medium text-white 
                        overflow-x-auto flex-nowrap whitespace-nowrap 
                        scrollbar-hide">
          {navItems.map((item, index) => (
            <li key={index} className="relative">
              <div
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
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openDropdown === index ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {item.subcategories && openDropdown === index && (
                  <ul className="absolute top-full left-0 bg-white text-black shadow-lg rounded-md min-w-[160px] z-50">
                    {item.subcategories.map((sub, i) => (
                      <li
                        key={i}
                        className="px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        <Link to={`/category/${item.slug}/${sub.slug}`}>
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
