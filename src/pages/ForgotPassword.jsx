import {useState} from 'react'

import axios from 'axios'

import {useNavigate} from 'react-router-dom'

const ForgotPassword = () => {
  const navigate = useNavigate()

  const [email, setEmail] =
    useState('')

  const [message, setMessage] =
    useState('')

  const [error, setError] =
    useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response =
        await axios.post(
          'http://localhost:5000/api/auth/forgot-password',
          {email}
        )

      setMessage(
        response.data.message
      )

      setError('')

      localStorage.setItem(
        'resetEmail',
        email
      )

      setTimeout(() => {
        navigate(
          '/reset-password'
        )
      }, 2000)
    } catch (error) {
      setMessage('')

      setError(
        error.response?.data
          ?.message
      )
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6">
          Forgot Password
        </h1>

        {message && (
          <p className="text-green-600 mb-4">
            {message}
          </p>
        )}

        {error && (
          <p className="text-red-600 mb-4">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={e =>
            setEmail(
              e.target.value
            )
          }
          className="w-full border p-4 rounded-xl mb-4"
        />

        <button
          className="w-full bg-blue-600 text-white py-4 rounded-xl"
        >
          Send OTP
        </button>

      </form>

    </div>
  )
}

export default ForgotPassword