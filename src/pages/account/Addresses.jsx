// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Addresses = () => {
//   const initialForm = {
//     fullName: '', phone: '', pincode: '', state: '', city: '',
//     addressLine: '', landmark: '', addressType: 'Home',
//   };

//   const [form, setForm] = useState(initialForm);
//   const [addresses, setAddresses] = useState([]);
//   const [areaSuggestions, setAreaSuggestions] = useState([]);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [errorMsg, setErrorMsg] = useState('');

//   const fetchAddresses = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get('/api/addresses', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAddresses(res.data.addresses || []);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const fetchPincodeData = async (pin) => {
//     try {
//       const res = await axios.get(`https://api.postalpincode.in/pincode/${pin}`);
//       const data = res.data[0];

//       if (data.Status === 'Success') {
//         const postOffice = data.PostOffice?.[0];
//         const allAreas = data.PostOffice.map((po) => po.Name);
//         setForm((prev) => ({
//           ...prev,
//           state: postOffice.State,
//           city: postOffice.District,
//         }));
//         setAreaSuggestions(allAreas);
//         setErrorMsg('');
//       } else {
//         setAreaSuggestions([]);
//         setErrorMsg('❌ Invalid Pincode');
//         setForm({ ...form, city: '', state: '' });
//       }
//     } catch (err) {
//       console.error('Pincode fetch error:', err);
//       setErrorMsg('❌ Invalid Pincode');
//     }
//   };

//   const handlePincodeChange = (e) => {
//     const val = e.target.value;
//     setForm({ ...form, pincode: val });
//     if (val.length === 6) {
//       fetchPincodeData(val);
//     } else {
//       setErrorMsg('');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');

//     try {
//       if (!form.city || !form.state) {
//         setErrorMsg('❌ Please enter valid pincode to fetch city/state');
//         return;
//       }

//       const payload = { ...form };
//       delete payload._id;
//       delete payload.__v;

//       if (isEditMode) {
//         await axios.put(`/api/addresses/${editId}`, payload, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       } else {
//         await axios.post('/api/addresses', payload, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       }

//       setForm(initialForm);
//       setIsEditMode(false);
//       setEditId(null);
//       setErrorMsg('');
//       fetchAddresses();
//     } catch (err) {
//       console.error(err);
//       setErrorMsg('❌ Something went wrong while saving the address');
//     }
//   };

//   const handleEdit = (addr) => {
//     setForm(addr);
//     setIsEditMode(true);
//     setEditId(addr._id);
//     setErrorMsg('');
//   };

//   const handleDelete = async (id) => {
//     const token = localStorage.getItem('token');
//     if (!window.confirm('Delete this address?')) return;
//     try {
//       await axios.delete(`/api/addresses/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchAddresses();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchAddresses();
//   }, []);

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//         {isEditMode ? 'Edit Address' : 'Add New Address'}
//       </h2>

//       {errorMsg && <div className="text-red-600 mb-2">{errorMsg}</div>}

//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Full Name" className="border p-2 rounded" required />
//         <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="border p-2 rounded" required />
//         <input value={form.pincode} onChange={handlePincodeChange} placeholder="Pincode" className="border p-2 rounded" required />
//         <input value={form.state} readOnly className="border p-2 rounded bg-gray-100" placeholder="State" />
//         <input value={form.city} readOnly className="border p-2 rounded bg-gray-100" placeholder="City" />
//         <input value={form.addressLine} onChange={(e) => setForm({ ...form, addressLine: e.target.value })} placeholder="Address Line" className="border p-2 rounded col-span-full" required />
//         <select value={form.landmark} onChange={(e) => setForm({ ...form, landmark: e.target.value })} className="border p-2 rounded">
//           <option value="">Select Area/Landmark</option>
//           {areaSuggestions.map((area, i) => (
//             <option key={i} value={area}>{area}</option>
//           ))}
//         </select>
//         <select value={form.addressType} onChange={(e) => setForm({ ...form, addressType: e.target.value })} className="border p-2 rounded">
//           <option>Home</option>
//           <option>Work</option>
//           <option>Other</option>
//         </select>
//         <button type="submit" className="col-span-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700">
//           {isEditMode ? 'Update Address' : 'Save Address'}
//         </button>
//       </form>

//       {/* 🔽 Saved Addresses */}
//       <div className="mt-10">
//         <h3 className="text-xl font-semibold mb-3 text-gray-700">Saved Addresses</h3>
//         {addresses.length === 0 ? (
//           <p className="text-gray-500">No addresses saved.</p>
//         ) : (
//           addresses.map((addr, i) => (
//             <div key={i} className="border p-4 rounded mb-4 bg-gray-50">
//               <div className="font-semibold">{addr.fullName} ({addr.addressType})</div>
//               <div>{addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}</div>
//               <div>📞 {addr.phone} | 🏷️ {addr.landmark}</div>
//               <div className="mt-2 flex gap-3">
//                 <button onClick={() => handleEdit(addr)} className="px-3 py-1 bg-yellow-500 text-white rounded">Edit</button>
//                 <button onClick={() => handleDelete(addr._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Addresses;



// url updated 




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from "../../config";     // <- import


const Addresses = () => {
  const initialForm = {
    fullName: '', phone: '', pincode: '', state: '', city: '',
    addressLine: '', landmark: '', addressType: 'Home',
  };

  const [form, setForm] = useState(initialForm);
  const [addresses, setAddresses] = useState([]);
  const [areaSuggestions, setAreaSuggestions] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/addresses`, {  // <- URL updated
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(res.data.addresses || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPincodeData = async (pin) => {
    try {
      const res = await axios.get(`https://api.postalpincode.in/pincode/${pin}`);
      const data = res.data[0];

      if (data.Status === 'Success') {
        const postOffice = data.PostOffice?.[0];
        const allAreas = data.PostOffice.map((po) => po.Name);
        setForm((prev) => ({
          ...prev,
          state: postOffice.State,
          city: postOffice.District,
        }));
        setAreaSuggestions(allAreas);
        setErrorMsg('');
      } else {
        setAreaSuggestions([]);
        setErrorMsg('❌ Invalid Pincode');
        setForm({ ...form, city: '', state: '' });
      }
    } catch (err) {
      console.error('Pincode fetch error:', err);
      setErrorMsg('❌ Invalid Pincode');
    }
  };

  const handlePincodeChange = (e) => {
    const val = e.target.value;
    setForm({ ...form, pincode: val });
    if (val.length === 6) {
      fetchPincodeData(val);
    } else {
      setErrorMsg('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      if (!form.city || !form.state) {
        setErrorMsg('❌ Please enter valid pincode to fetch city/state');
        return;
      }

      const payload = { ...form };
      delete payload._id;
      delete payload.__v;

      if (isEditMode) {
        await axios.put(`${API_URL}/addresses/${editId}`, payload, {  // <- URL updated
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API_URL}/addresses`, payload, {  // <- URL updated
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setForm(initialForm);
      setIsEditMode(false);
      setEditId(null);
      setErrorMsg('');
      fetchAddresses();
    } catch (err) {
      console.error(err);
      setErrorMsg('❌ Something went wrong while saving the address');
    }
  };

  const handleEdit = (addr) => {
    setForm(addr);
    setIsEditMode(true);
    setEditId(addr._id);
    setErrorMsg('');
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!window.confirm('Delete this address?')) return;
    try {
      await axios.delete(`${API_URL}/addresses/${id}`, {  // <- URL updated
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAddresses();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {isEditMode ? 'Edit Address' : 'Add New Address'}
      </h2>

      {errorMsg && <div className="text-red-600 mb-2">{errorMsg}</div>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Full Name" className="border p-2 rounded" required />
        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="border p-2 rounded" required />
        <input value={form.pincode} onChange={handlePincodeChange} placeholder="Pincode" className="border p-2 rounded" required />
        <input value={form.state} readOnly className="border p-2 rounded bg-gray-100" placeholder="State" />
        <input value={form.city} readOnly className="border p-2 rounded bg-gray-100" placeholder="City" />
        <input value={form.addressLine} onChange={(e) => setForm({ ...form, addressLine: e.target.value })} placeholder="Address Line" className="border p-2 rounded col-span-full" required />
        <select value={form.landmark} onChange={(e) => setForm({ ...form, landmark: e.target.value })} className="border p-2 rounded">
          <option value="">Select Area/Landmark</option>
          {areaSuggestions.map((area, i) => (
            <option key={i} value={area}>{area}</option>
          ))}
        </select>
        <select value={form.addressType} onChange={(e) => setForm({ ...form, addressType: e.target.value })} className="border p-2 rounded">
          <option>Home</option>
          <option>Work</option>
          <option>Other</option>
        </select>
        <button type="submit" className="col-span-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700">
          {isEditMode ? 'Update Address' : 'Save Address'}
        </button>
      </form>

      {/* 🔽 Saved Addresses */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Saved Addresses</h3>
        {addresses.length === 0 ? (
          <p className="text-gray-500">No addresses saved.</p>
        ) : (
          addresses.map((addr, i) => (
            <div key={i} className="border p-4 rounded mb-4 bg-gray-50">
              <div className="font-semibold">{addr.fullName} ({addr.addressType})</div>
              <div>{addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}</div>
              <div>📞 {addr.phone} | 🏷️ {addr.landmark}</div>
              <div className="mt-2 flex gap-3">
                <button onClick={() => handleEdit(addr)} className="px-3 py-1 bg-yellow-500 text-white rounded">Edit</button>
                <button onClick={() => handleDelete(addr._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Addresses;
