import {useState} from 'react'

import axios from 'axios'

import {useNavigate} from 'react-router-dom'

const VerifyOtp = () => {
  const navigate = useNavigate()

  const [email, setEmail] =
    useState('')

  const [otp, setOtp] =
    useState('')

  const [error, setError] =
    useState('')

  const [message, setMessage] =
    useState('')

  const handleVerify = async e => {
    e.preventDefault()

    try {
      const response =
        await axios.post(
          'https://e-cart-backend-39er.onrender.com/api/auth/verify-otp',
          {
            email,
            otp,
          }
        )

      setError('')

      setMessage(
        response.data.message
      )

      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error) {
      setMessage('')

      setError(
        error.response?.data
          ?.message ||
          'Verification Failed'
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black flex justify-center items-center px-4">
      <form
        onSubmit={handleVerify}
        className="backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-md text-white"
      >
        <h1 className="text-4xl font-bold text-center mb-8">
          Verify OTP
        </h1>

        {error && (
          <p className="text-red-400 text-center mb-4">
            {error}
          </p>
        )}

        {message && (
          <p className="text-green-400 text-center mb-4">
            {message}
          </p>
        )}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={e =>
            setEmail(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 outline-none mb-5"
        />

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={e =>
            setOtp(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 outline-none mb-5"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 py-4 rounded-xl font-bold text-lg"
        >
          Verify OTP
        </button>
      </form>
    </div>
  )
}

export default VerifyOtp