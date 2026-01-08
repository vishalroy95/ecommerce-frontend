// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// const AddressContext = createContext();

// export const useAddress = () => useContext(AddressContext);

// export const AddressProvider = ({ children }) => {
//   const [addresses, setAddresses] = useState([]);
//   const token = localStorage.getItem("token");

//   const fetchAddresses = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/addresses", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAddresses(res.data.addresses);
//     } catch (err) {
//       console.error("Fetch address error", err);
//     }
//   };

//   useEffect(() => {
//     if (token) fetchAddresses();
//   }, [token]);

//   return (
//     <AddressContext.Provider value={{ addresses, setAddresses, fetchAddresses }}>
//       {children}
//     </AddressContext.Provider>
//   );
// };






// with backend url     



import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

const AddressContext = createContext();

export const useAddress = () => useContext(AddressContext);

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const token = localStorage.getItem("token");

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(`${API_URL}/addresses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(res.data.addresses);
    } catch (err) {
      console.error("Fetch address error", err);
    }
  };

  useEffect(() => {
    if (token) fetchAddresses();
  }, [token]);

  return (
    <AddressContext.Provider value={{ addresses, setAddresses, fetchAddresses }}>
      {children}
    </AddressContext.Provider>
  );
};
