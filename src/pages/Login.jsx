import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
      );

      localStorage.setItem("token", response.data.token);

      setEmail("");
      setPassword("");
window.location.href = "/";
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black flex justify-center items-center overflow-hidden px-4 relative">
      <div className="absolute w-72 h-72 bg-cyan-500 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse"></div>

      <div className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-30 bottom-10 right-10 animate-pulse"></div>

      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-md text-white z-10"
      >
        <h1 className="text-4xl font-bold text-center mb-8">Welcome Back</h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 outline-none mb-5 focus:border-cyan-400 transition duration-300"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 outline-none mb-6 focus:border-cyan-400 transition duration-300"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 py-4 rounded-xl font-bold text-lg hover:scale-105 transition duration-300 shadow-lg"
        >
          Login
        </button>

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
