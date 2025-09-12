// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="bg-gray-100 text-gray-700 mt-10 pt-10 pb-6 border-t">
//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
//         {/* Section 1: About */}
//         <div>
//           <h3 className="text-lg font-semibold mb-3 text-orange-500">About Us</h3>
//           <p className="text-gray-600">We provide top quality beauty & wellness products at your doorstep.</p>
//         </div>

//         {/* Section 2: Categories */}
//         <div>
//           <h3 className="text-lg font-semibold mb-3 text-orange-500">Categories</h3>
//           <ul className="space-y-2">
//             <li><a href="/makeup" className="hover:underline">Makeup</a></li>
//             <li><a href="/skin" className="hover:underline">Skin</a></li>
//             <li><a href="/hair" className="hover:underline">Hair</a></li>
//             <li><a href="/fragrance" className="hover:underline">Fragrance</a></li>
//           </ul>
//         </div>

//         {/* Section 3: Customer Care */}
//         <div>
//           <h3 className="text-lg font-semibold mb-3 text-orange-500">Customer Care</h3>
//           <ul className="space-y-2">
//             <li><a href="/help" className="hover:underline">Help Center</a></li>
//             <li><a href="/returns" className="hover:underline">Returns</a></li>
//             <li><a href="/track" className="hover:underline">Track Order</a></li>
//             <li><a href="/contact" className="hover:underline">Contact Us</a></li>
//           </ul>
//         </div>

//         {/* Section 4: Social Links */}
//         <div>
//           <h3 className="text-lg font-semibold mb-3 text-orange-500">Connect with Us</h3>
//           <div className="flex space-x-4">
//             <a href="#" className="hover:text-orange-400">Instagram</a>
//             <a href="#" className="hover:text-orange-400">Facebook</a>
//             <a href="#" className="hover:text-orange-400">YouTube</a>
//           </div>
//           <p className="text-xs text-gray-500 mt-4">© 2025 Ideacraft. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-white font-bold text-lg mb-4">IDEACRAFT</h2>
          <p className="text-sm">
            Your one-stop shop for beauty, skincare, and personal care
            essentials. Discover products that bring out the best in you.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition">
                Contact
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-white transition">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF className="hover:text-white transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="hover:text-white transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="hover:text-white transition" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <FaYoutube className="hover:text-white transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} IDEACRAFT. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
