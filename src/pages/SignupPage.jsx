// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const SignupPage = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [isError, setIsError] = useState(false);

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     const userData = { name, email,  password };
//     console.log("Signup with:", userData);

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setIsError(false);
//         setMessage("✅ Signup successful");
//         setName("");
//         setEmail("");
//         setPhone("");
//         setPassword("");
//       } else {
//         setIsError(true);
//         setMessage("❌ " + data.message);
//       }
//     } catch (err) {
//       console.error("Signup error:", err);
//       setIsError(true);
//       setMessage("❌ Server error. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-20 px-4">
//       <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Create Your Account ✨</h2>
//         <p className="text-center text-sm text-gray-500 mb-6">Sign up to get started</p>

//         {message && (
//           <div
//             className={`text-sm mb-4 text-center font-medium ${
//               isError ? "text-red-600" : "text-green-600"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         <form onSubmit={handleSignup} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             required
//             onChange={(e) => setName(e.target.value)}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             required
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//           />
          
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             required
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//           />
//           <button
//             type="submit"
//             className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition font-semibold"
//           >
//             Sign Up
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-600 mt-6">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-pink-600 hover:underline font-medium"
//           >
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;






// backend url updated




import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../config";   // 👈 yaha import add kiya

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    const userData = { name, email, password };

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {   // 👈 backend URL fixed
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsError(false);
        setMessage("✅ Signup successful");
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
      } else {
        setIsError(true);
        setMessage("❌ " + data.message);
      }
    } catch (err) {
      console.error("Signup error:", err);
      setIsError(true);
      setMessage("❌ Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Create Your Account ✨
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Sign up to get started
        </p>

        {message && (
          <div
            className={`text-sm mb-4 text-center font-medium ${
              isError ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition font-semibold"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

