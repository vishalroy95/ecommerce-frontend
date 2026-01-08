import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { API_URL } from "../config"; //  IMPORTANT

const CheckoutPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    state: "",
    city: "",
    addressLine: "",
    landmark: "",
    addressType: "Home",
  });
  const [areaSuggestions, setAreaSuggestions] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch all addresses
  const fetchAddresses = async () => {
    try {
      const res = await axios.get(`${API_URL}/addresses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(res.data.addresses || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Handle pincode auto-fill
  const handlePincodeChange = async (e) => {
    const val = e.target.value;
    setForm({ ...form, pincode: val });

    if (val.length === 6) {
      try {
        const res = await axios.get(
          `https://api.postalpincode.in/pincode/${val}`
        );
        const data = res.data[0];
        if (data.Status === "Success") {
          const postOffice = data.PostOffice?.[0];
          const allAreas = data.PostOffice.map((po) => po.Name);
          setForm((prev) => ({
            ...prev,
            state: postOffice.State,
            city: postOffice.District,
          }));
          setAreaSuggestions(allAreas);
          setErrorMsg("");
        } else {
          setErrorMsg("❌ Invalid Pincode");
        }
      } catch {
        setErrorMsg("❌ Invalid Pincode");
      }
    } else {
      setErrorMsg("");
    }
  };

  // Add or update address
  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    if (!form.city || !form.state) {
      setErrorMsg("❌ Please enter valid pincode");
      return;
    }

    try {
      const payload = { ...form };
      if (isEditMode) {
        await axios.put(`${API_URL}/addresses/${editId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API_URL}/addresses`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setForm({
        fullName: "",
        phone: "",
        pincode: "",
        state: "",
        city: "",
        addressLine: "",
        landmark: "",
        addressType: "Home",
      });
      setIsEditMode(false);
      setEditId(null);
      fetchAddresses();
    } catch {
      setErrorMsg("❌ Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this address?")) return;
    try {
      await axios.delete(`${API_URL}/addresses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAddresses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (addr) => {
    setForm(addr);
    setIsEditMode(true);
    setEditId(addr._id);
  };

  // ✅ Proceed to payment selection instead of direct order
  const handleProceedToPayment = () => {
    if (!selectedAddressId) {
      setErrorMsg("❌ Please select a delivery address.");
      return;
    }

    navigate("/paymentselect", {
      state: { addressId: selectedAddressId, token },
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-4">Select Delivery Address</h2>

      {errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}

      {/* Address form */}
      <form
        onSubmit={handleAddressSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
      >
        <input
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          placeholder="Full Name"
          className="border p-2 rounded"
          required
        />
        <input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Phone Number"
          className="border p-2 rounded"
          required
        />
        <input
          value={form.pincode}
          onChange={handlePincodeChange}
          placeholder="Pincode"
          className="border p-2 rounded"
          required
        />
        <input
          value={form.state}
          readOnly
          placeholder="State"
          className="border p-2 rounded bg-gray-100"
        />
        <input
          value={form.city}
          readOnly
          placeholder="City"
          className="border p-2 rounded bg-gray-100"
        />
        <input
          value={form.addressLine}
          onChange={(e) => setForm({ ...form, addressLine: e.target.value })}
          placeholder="Address Line"
          className="border p-2 rounded col-span-full"
          required
        />
        <select
          value={form.landmark}
          onChange={(e) => setForm({ ...form, landmark: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Select Landmark</option>
          {areaSuggestions.map((area, i) => (
            <option key={i} value={area}>
              {area}
            </option>
          ))}
        </select>
        <select
          value={form.addressType}
          onChange={(e) => setForm({ ...form, addressType: e.target.value })}
          className="border p-2 rounded"
        >
          <option>Home</option>
          <option>Work</option>
          <option>Other</option>
        </select>
        <button
          type="submit"
          className="col-span-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
        >
          {isEditMode ? "Update Address" : "Save Address"}
        </button>
      </form>

      {/* Address list */}
      {addresses.length === 0 ? (
        <p className="text-gray-600">No address found. Please add one above.</p>
      ) : (
        <div className="space-y-4">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className={`border p-4 rounded transition ${
                selectedAddressId === addr._id
                  ? "border-pink-600 bg-pink-50"
                  : "border-gray-300"
              }`}
            >
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="address"
                  value={addr._id}
                  checked={selectedAddressId === addr._id}
                  onChange={() => setSelectedAddressId(addr._id)}
                />
                <div>
                  <div className="font-semibold">
                    {addr.fullName} ({addr.addressType})
                  </div>
                  <div>
                    {addr.addressLine}, {addr.city}, {addr.state} -{" "}
                    {addr.pincode}
                  </div>
                  <div>
                    📞 {addr.phone} | 🏷️ {addr.landmark}
                  </div>
                </div>
              </label>
              <div className="mt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => handleEdit(addr)}
                  className="text-yellow-600"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(addr._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Proceed button */}
      <button
        onClick={handleProceedToPayment}
        className="mt-8 w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
      >
        Confirm & Proceed
      </button>
    </div>
  );
};

export default CheckoutPage;




//  updated code




// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// // ✅ RENDER BACKEND URL
// const API_BASE = "https://e-commerce-backend-4-vplk.onrender.com";

// const CheckoutPage = () => {
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddressId, setSelectedAddressId] = useState(null);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [form, setForm] = useState({
//     fullName: "",
//     phone: "",
//     pincode: "",
//     state: "",
//     city: "",
//     addressLine: "",
//     landmark: "",
//     addressType: "Home",
//   });

//   const [areaSuggestions, setAreaSuggestions] = useState([]);
//   const [errorMsg, setErrorMsg] = useState("");

//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   /* ================= FETCH ADDRESSES ================= */
//   const fetchAddresses = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/addresses`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAddresses(res.data.addresses || []);
//     } catch (err) {
//       console.error("Fetch address error:", err);
//     }
//   };

//   useEffect(() => {
//     if (token) fetchAddresses();
//   }, [token]);

//   /* ================= PINCODE AUTO FILL ================= */
//   const handlePincodeChange = async (e) => {
//     const val = e.target.value;
//     setForm((prev) => ({ ...prev, pincode: val }));

//     if (val.length === 6) {
//       try {
//         const res = await axios.get(
//           `https://api.postalpincode.in/pincode/${val}`
//         );
//         const data = res.data[0];

//         if (data.Status === "Success") {
//           const postOffice = data.PostOffice[0];
//           setForm((prev) => ({
//             ...prev,
//             state: postOffice.State,
//             city: postOffice.District,
//           }));
//           setAreaSuggestions(data.PostOffice.map((po) => po.Name));
//           setErrorMsg("");
//         } else {
//           setErrorMsg("❌ Invalid Pincode");
//         }
//       } catch {
//         setErrorMsg("❌ Invalid Pincode");
//       }
//     }
//   };

//   /* ================= ADD / UPDATE ADDRESS ================= */
//   const handleAddressSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.city || !form.state) {
//       setErrorMsg("❌ Please enter valid pincode");
//       return;
//     }

//     try {
//       if (isEditMode) {
//         await axios.put(
//           `${API_BASE}/api/addresses/${editId}`,
//           form,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       } else {
//         await axios.post(
//           `${API_BASE}/api/addresses`,
//           form,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       }

//       setForm({
//         fullName: "",
//         phone: "",
//         pincode: "",
//         state: "",
//         city: "",
//         addressLine: "",
//         landmark: "",
//         addressType: "Home",
//       });

//       setIsEditMode(false);
//       setEditId(null);
//       fetchAddresses();
//     } catch {
//       setErrorMsg("❌ Something went wrong");
//     }
//   };

//   /* ================= DELETE ================= */
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this address?")) return;
//     await axios.delete(`${API_BASE}/api/addresses/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     fetchAddresses();
//   };

//   /* ================= EDIT ================= */
//   const handleEdit = (addr) => {
//     setForm({
//       fullName: addr.fullName || "",
//       phone: addr.phone || "",
//       pincode: addr.pincode || "",
//       state: addr.state || "",
//       city: addr.city || "",
//       addressLine: addr.addressLine || addr.address || "",
//       landmark: addr.landmark || "",
//       addressType: addr.addressType || "Home",
//     });
//     setIsEditMode(true);
//     setEditId(addr._id);
//   };

//   /* ================= PROCEED ================= */
//   const handleProceed = () => {
//     if (!selectedAddressId) {
//       setErrorMsg("❌ Please select a delivery address");
//       return;
//     }
//     navigate("/paymentselect", {
//       state: { addressId: selectedAddressId },
//     });
//   };

//   return (
//     <div className="max-w-3xl mx-auto px-6 py-10">
//       <h2 className="text-2xl font-bold mb-4">Select Delivery Address</h2>

//       {errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}

//       {/* ================= FORM ================= */}
//       <form
//         onSubmit={handleAddressSubmit}
//         className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
//       >
//         <input
//           value={form.fullName}
//           onChange={(e) => setForm({ ...form, fullName: e.target.value })}
//           placeholder="Full Name"
//           className="border p-2 rounded"
//           required
//         />

//         <input
//           value={form.phone}
//           onChange={(e) => setForm({ ...form, phone: e.target.value })}
//           placeholder="Phone Number"
//           className="border p-2 rounded"
//           required
//         />

//         <input
//           value={form.pincode}
//           onChange={handlePincodeChange}
//           placeholder="Pincode"
//           className="border p-2 rounded"
//           required
//         />

//         <input
//           value={form.state}
//           readOnly
//           placeholder="State"
//           className="border p-2 rounded bg-gray-100"
//         />

//         <input
//           value={form.city}
//           readOnly
//           placeholder="City"
//           className="border p-2 rounded bg-gray-100"
//         />

//         <input
//           value={form.addressLine}
//           onChange={(e) => setForm({ ...form, addressLine: e.target.value })}
//           placeholder="Address Line"
//           className="border p-2 rounded col-span-full"
//           required
//         />

//         <select
//           value={form.landmark}
//           onChange={(e) => setForm({ ...form, landmark: e.target.value })}
//           className="border p-2 rounded"
//         >
//           <option value="">Select Landmark</option>
//           {areaSuggestions.map((a, i) => (
//             <option key={i}>{a}</option>
//           ))}
//         </select>

//         <select
//           value={form.addressType}
//           onChange={(e) => setForm({ ...form, addressType: e.target.value })}
//           className="border p-2 rounded"
//         >
//           <option>Home</option>
//           <option>Work</option>
//           <option>Other</option>
//         </select>

//         <button className="col-span-full bg-pink-600 text-white py-2 rounded">
//           {isEditMode ? "Update Address" : "Save Address"}
//         </button>
//       </form>

//       {/* ================= ADDRESS LIST ================= */}
//       {addresses.map((addr) => (
//         <div
//           key={addr._id}
//           className={`border p-4 rounded mb-3 ${
//             selectedAddressId === addr._id
//               ? "border-pink-600 bg-pink-50"
//               : ""
//           }`}
//         >
//           <label className="flex gap-3 cursor-pointer">
//             <input
//               type="radio"
//               checked={selectedAddressId === addr._id}
//               onChange={() => setSelectedAddressId(addr._id)}
//             />
//             <div>
//               <p className="font-semibold">
//                 {addr.fullName || "User"} ({addr.addressType})
//               </p>
//               <p>
//                 {addr.addressLine || addr.address}, {addr.city},{" "}
//                 {addr.state} - {addr.pincode}
//               </p>
//               <p>📞 {addr.phone}</p>
//             </div>
//           </label>

//           <div className="flex gap-4 mt-2">
//             <button
//               onClick={() => handleEdit(addr)}
//               className="text-yellow-600"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => handleDelete(addr._id)}
//               className="text-red-600"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}

//       <button
//         onClick={handleProceed}
//         className="mt-6 w-full bg-pink-600 text-white py-3 rounded-lg font-semibold"
//       >
//         Confirm & Proceed
//       </button>
//     </div>
//   );
// };

// export default CheckoutPage;








