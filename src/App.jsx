// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import Navbar from './components/Navbar';
// import CartPage from './pages/CartPage';
// import WishlistPage from './pages/WishlistPage';
// import SubCategoryPage from './pages/SubCategoryPage';
// import CategoryPage from './pages/CategoryPage';
// import SearchPage from './pages/SearchPage';
// import ViewProduct from './pages/ViewProduct';
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
// import ProtectedRoute from './components/ProtectedRoute';
// import CheckoutPage from './pages/CheckoutPage';
// import OrderSuccess from './pages/OrderSuccess';
// import PaymentSelectPage from './pages/PaymentSelectPage';

// // 👤 Individual Account Pages
// import MyProfile from './pages/account/MyProfile';
// import MyOrders from './pages/account/MyOrders';
// import Addresses from './pages/account/Addresses';
// import Wallet from './pages/account/Wallet';

// const App = () => {
//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Sticky Header + Navbar */}
//       <div className="sticky top-0 z-50 bg-white">
//         <Header />
//         <Navbar />
//       </div>

//       <main className="flex-grow">
//         <Routes>
//           {/* Public Pages */}
//           <Route path="/" element={<Home />} />
//           <Route path="/cart" element={<CartPage />} />
//           <Route path="/wishlist" element={<WishlistPage />} />
//           <Route path="/category/:categorySlug" element={<CategoryPage />} />
//           <Route path="/category/:categorySlug/:subCategorySlug" element={<SubCategoryPage />} />
//           <Route path="/search" element={<SearchPage />} />
//           <Route path="/product/:id" element={<ViewProduct />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/signup" element={<SignupPage />} />
//           <Route path="/checkout" element={<CheckoutPage />} />
//           <Route path="/ordersuccess" element={<OrderSuccess />} />
//           <Route path="/paymentselect" element={<PaymentSelectPage />} />

    
   
//           {/* 👤 Individual Protected Account Pages */}
//           <Route
//             path="/account/profile"
//             element={
//               <ProtectedRoute>
//                 <MyProfile />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/account/orders"
//             element={
//               <ProtectedRoute>
//                 <MyOrders />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/account/addresses"
//             element={
//               <ProtectedRoute>
//                 <Addresses />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/account/wallet"
//             element={
//               <ProtectedRoute>
//                 <Wallet />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default App;





import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import SubCategoryPage from './pages/SubCategoryPage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import ViewProduct from './pages/ViewProduct';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProtectedRoute from './components/ProtectedRoute';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccess from './pages/OrderSuccess';
import PaymentSelectPage from './pages/PaymentSelectPage';

// 👤 Individual Account Pages
import MyProfile from './pages/account/MyProfile';
import MyOrders from './pages/account/MyOrders';
import Addresses from './pages/account/Addresses';
import Wallet from './pages/account/Wallet';

// 🔔 Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Header + Navbar */}
      <div className="sticky top-0 z-50 bg-white">
        <Header />
        <Navbar />
      </div>

      <main className="flex-grow">
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
          <Route path="/category/:categorySlug/:subCategorySlug" element={<SubCategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/product/:id" element={<ViewProduct />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/ordersuccess" element={<OrderSuccess />} />
          <Route path="/paymentselect" element={<PaymentSelectPage />} />

          {/* 👤 Individual Protected Account Pages */}
          <Route
            path="/account/profile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/addresses"
            element={
              <ProtectedRoute>
                <Addresses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/wallet"
            element={
              <ProtectedRoute>
                <Wallet />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />

      {/* 🔔 Toastify Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default App;
