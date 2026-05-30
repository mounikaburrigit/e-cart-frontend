import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* REMOVE SPACES */

    const trimmedName = name.trim();

    const trimmedEmail = email.trim();

    const trimmedPassword = password.trim();

    /* EMPTY VALIDATION */

    if (trimmedName === "" || trimmedEmail === "" || trimmedPassword === "") {
      setError("All fields are required");

      return;
    }

    /* NAME VALIDATION */

    if (trimmedName.length < 3) {
      setError("Name must be at least 3 characters");

      return;
    }

    /* EMAIL VALIDATION */

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      setError("Enter valid email address");

      return;
    }

    /* PASSWORD VALIDATION */

    if (trimmedPassword.length < 6) {
      setError("Password must be at least 6 characters");

      return;
    }

    /* STRONG PASSWORD */

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).+$/;

    if (!passwordRegex.test(trimmedPassword)) {
      setError("Password must contain 1 capital letter and 1 number");

      return;
    }

    try {
      setError("");

      await axios.post("http://localhost:5000/api/auth/register", {
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
      });

      setName("");
      setEmail("");
      setPassword("");

      navigate("/verify-otp", {
        state: {
          email: trimmedEmail,
        },
      });
    } catch (error) {
      setError(error.response?.data?.message || "User already exists");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black flex justify-center items-center px-4 overflow-hidden relative">
      <div className="absolute w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse"></div>

      <div className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-30 bottom-10 right-10 animate-pulse"></div>

      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-md text-white z-10"
      >
        <h1 className="text-4xl font-bold text-center mb-8">Create Account</h1>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 outline-none mb-5 focus:border-pink-500 transition duration-300"
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 outline-none mb-5 focus:border-pink-500 transition duration-300"
        />

        {/* Password Input */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-pink-500 transition duration-300"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-5 text-xl text-gray-300"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="
    px-10
    py-4
    bg-gradient-to-r
    from-pink-500
    to-purple-600
    rounded-xl
    font-bold
    text-lg
    hover:scale-105
    transition
    duration-300
    shadow-lg
  "
          >
            Register
          </button>
        </div>

        <p className="text-center mt-6 text-gray-300">
          Already have account?
          <Link to="/login" className="text-pink-400 ml-2">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
