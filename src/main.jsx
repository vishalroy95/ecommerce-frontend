import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
  <BrowserRouter>
  <CartProvider>
  <WishlistProvider>
     <App />
  </WishlistProvider>    
  </CartProvider>
   
  </BrowserRouter>
  </React.StrictMode>
);

