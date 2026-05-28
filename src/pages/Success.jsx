import {
  useNavigate,
} from 'react-router-dom'

import Navbar from '../components/Navbar'

const Success = () => {
  const navigate = useNavigate()

  const continueShopping = () => {
    navigate('/')
  }

  return (
    <>
      <Navbar />

      <div
        className="
        min-h-screen
        bg-gray-100
        flex
        justify-center
        items-center
        p-6
      "
      >
        <div
          className="
          bg-white
          rounded-2xl
          shadow-lg
          p-10
          text-center
          max-w-lg
          w-full
        "
        >
          <div className="text-7xl mb-6">
            ✅
          </div>

          <h1
            className="
            text-4xl
            font-bold
            text-green-600
          "
          >
            Order Placed Successfully
          </h1>

          <p
            className="
            text-gray-600
            mt-4
            text-lg
          "
          >
            Your order has been placed
            successfully.
          </p>

          <div
            className="
            bg-gray-100
            rounded-xl
            p-4
            mt-8
          "
          >
            <p className="text-lg">
              📦 Delivery by:
            </p>

            <h2
              className="
              text-2xl
              font-bold
              mt-2
            "
            >
              Tomorrow
            </h2>
          </div>

          <button
            onClick={continueShopping}
            className="
            w-full
            bg-blue-600
            text-white
            py-4
            rounded-xl
            mt-8
            text-lg
            font-semibold
            hover:bg-blue-700
          "
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  )
}

export default Success