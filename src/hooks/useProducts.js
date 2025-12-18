// // src/hooks/useProducts.js
// import { useEffect, useState } from "react";
// import axios from "axios";

// const useProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/products")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("Failed to load products", err))
//       .finally(() => setLoading(false));
//   }, []);

//   return { products, loading };
// };

// export default useProducts;


// backend url  



// // src/hooks/useProducts.js
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_URL } from "../config";  // <- yahan import

// const useProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get(`${API_URL}/api/products`)  // <- backend URL yahan use hua
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("Failed to load products", err))
//       .finally(() => setLoading(false));
//   }, []);

//   return { products, loading };
// };

// export default useProducts;





// src/hooks/useProducts.js
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading };
};

export default useProducts;


