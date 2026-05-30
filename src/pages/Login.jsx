import { useState } from "react";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  /* LOGIN */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      setError("All fields are required");

      return;
    }

    try {
      setLoading(true);

      setError("");

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
      );

      /* STORE TOKEN */

      localStorage.setItem("token", response.data.token);

      /* STORE USER */

      localStorage.setItem("user", JSON.stringify(response.data.user));

      /* CLEAR INPUTS */

      setEmail("");

      setPassword("");

      /* NAVIGATE */

      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black flex justify-center items-center overflow-hidden px-4 relative">
      {/* GLOW EFFECTS */}

      <div className="absolute w-72 h-72 bg-cyan-500 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse"></div>

      <div className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-30 bottom-10 right-10 animate-pulse"></div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-md text-white z-10"
      >
        <h1 className="text-4xl font-bold text-center mb-8">Welcome Back</h1>

        {/* ERROR */}

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 outline-none mb-5 focus:border-cyan-400 transition duration-300"
        />

        {/* PASSWORD */}

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-cyan-400 transition duration-300"
          />

          {/* SHOW PASSWORD */}

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-5 text-xl text-gray-300"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <p
          onClick={() => navigate("/forgot-password")}
          className="
  text-right
  text-cyan-400
  cursor-pointer
  mb-6
"
        >
          Forgot Password?
        </p>

        {/* LOGIN BUTTON */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="w-50 text-center bg-gradient-to-r from-cyan-500 to-purple-600 py-4 rounded-xl font-bold text-lg hover:scale-105 transition duration-300 shadow-lg"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </div>

        {/* REGISTER LINK */}

        <p className="text-center mt-6 text-gray-300">
          Don't have account?
          <Link to="/register" className="text-cyan-400 ml-2">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
