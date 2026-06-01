import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const [otp, setOtp] = useState("");

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://e-cart-backend-39er.onrender.com/api/auth/reset-password",
        {
          email,
          otp,
          password,
        },
      );

      setMessage(response.data.message);

      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage("");

      setError(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6">Reset Password</h1>

        {message && <p className="text-green-600 mb-4">{message}</p>}

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border p-4 rounded-xl mb-4"
        />

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-4 rounded-xl mb-4"
        />

        <button className="w-full bg-green-600 text-white py-4 rounded-xl">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
