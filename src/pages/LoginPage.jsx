// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [isError, setIsError] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       navigate("/"); //  already logged in → home page
//     }
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setIsError(false);
//         setMessage("✅ Login successful");
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));

//         // ✅ Redirect to saved path or home
//         const redirectPath = localStorage.getItem("redirectTo") || "/";
//         localStorage.removeItem("redirectTo");
//         navigate(redirectPath, { replace: true });

//       } else {
//         setIsError(true);
//         setMessage("❌ " + data.message);
//       }
//     } catch (err) {
//       setIsError(true);
//       setMessage("❌ Server error");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
//           Welcome Back 👋
//         </h2>
//         <p className="text-center text-sm text-gray-500 mb-6">Login to your account</p>

//         {message && (
//           <div
//             className={`text-sm mb-4 text-center font-medium ${
//               isError ? "text-red-600" : "text-green-600"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         <form onSubmit={handleLogin} className="space-y-4">
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
//             Login
//           </button>
//         </form>
//         <p className="text-center text-sm text-gray-600 mt-6">
//           You don't have an account?{" "}
//           <Link
//             to="/signup"
//             className="text-pink-600 hover:underline font-medium"
//           >
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;




// backend url updated 




import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../config";   // 👈 backend URL import

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // already logged in → home
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/auth/login`, {   // 👈 fixed URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsError(false);
        setMessage("✅ Login successful");

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect to saved path or home
        const redirectPath = localStorage.getItem("redirectTo") || "/";
        localStorage.removeItem("redirectTo");

        navigate(redirectPath, { replace: true });

      } else {
        setIsError(true);
        setMessage("❌ " + data.message);
      }
    } catch (err) {
      setIsError(true);
      setMessage("❌ Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Welcome Back 👋
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">Login to your account</p>

        {message && (
          <div
            className={`text-sm mb-4 text-center font-medium ${
              isError ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
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
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          You don't have an account?{" "}
          <Link to="/signup" className="text-pink-600 hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

