import {
  useEffect,
  useState,
} from 'react'

import Navbar from '../components/Navbar'

const Payment = () => {
  const [cartItems, setCartItems] =
    useState([])

  const [paymentMethod, setPaymentMethod] =
    useState('UPI')

  useEffect(() => {
    const items =
      JSON.parse(
        localStorage.getItem('cart')
      ) || []

    setCartItems(items)
  }, [])

  const totalPrice =
    cartItems.reduce(
      (total, item) =>
        total +
        item.price * item.quantity,
      0
    )

  const placeOrder = () => {
  alert(
    'Order Placed Successfully'
  )

  localStorage.removeItem('cart')

  window.location.href =
    '/success'
}

  return (
    <>
      <Navbar />

      <div
        className="
        min-h-screen
        bg-gray-100
        p-6
      "
      >
        <h1
          className="
          text-4xl
          font-bold
          mb-8
        "
        >
          Payment
        </h1>

        <div
          className="
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-8
        "
        >
          {/* LEFT */}

          <div className="lg:col-span-2">
            <div
              className="
              bg-white
              rounded-2xl
              shadow-md
              p-6
            "
            >
              <h2
                className="
                text-2xl
                font-bold
                mb-6
              "
              >
                Select Payment Method
              </h2>

              <div className="space-y-4">
                <label
                  className="
                  flex
                  items-center
                  gap-3
                  border
                  p-4
                  rounded-xl
                  cursor-pointer
                "
                >
                  <input
                    type="radio"
                    checked={
                      paymentMethod ===
                      'UPI'
                    }
                    onChange={() =>
                      setPaymentMethod(
                        'UPI'
                      )
                    }
                  />

                  <span className="text-lg">
                    UPI
                  </span>
                </label>

                <label
                  className="
                  flex
                  items-center
                  gap-3
                  border
                  p-4
                  rounded-xl
                  cursor-pointer
                "
                >
                  <input
                    type="radio"
                    checked={
                      paymentMethod ===
                      'Credit Card'
                    }
                    onChange={() =>
                      setPaymentMethod(
                        'Credit Card'
                      )
                    }
                  />

                  <span className="text-lg">
                    Credit Card
                  </span>
                </label>

                <label
                  className="
                  flex
                  items-center
                  gap-3
                  border
                  p-4
                  rounded-xl
                  cursor-pointer
                "
                >
                  <input
                    type="radio"
                    checked={
                      paymentMethod ===
                      'Debit Card'
                    }
                    onChange={() =>
                      setPaymentMethod(
                        'Debit Card'
                      )
                    }
                  />

                  <span className="text-lg">
                    Debit Card
                  </span>
                </label>

                <label
                  className="
                  flex
                  items-center
                  gap-3
                  border
                  p-4
                  rounded-xl
                  cursor-pointer
                "
                >
                  <input
                    type="radio"
                    checked={
                      paymentMethod ===
                      'Cash On Delivery'
                    }
                    onChange={() =>
                      setPaymentMethod(
                        'Cash On Delivery'
                      )
                    }
                  />

                  <span className="text-lg">
                    Cash On Delivery
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div
            className="
            bg-white
            rounded-2xl
            shadow-md
            p-6
            h-fit
          "
          >
            <h2
              className="
              text-2xl
              font-bold
              mb-6
            "
            >
              Payment Summary
            </h2>

            <div
              className="
              flex
              justify-between
              text-lg
              mb-4
            "
            >
              <span>Items</span>

              <span>
                {cartItems.length}
              </span>
            </div>

            <div
              className="
              flex
              justify-between
              text-lg
              mb-4
            "
            >
              <span>Total Price</span>

              <span>
                ₹{totalPrice}
              </span>
            </div>

            <div
              className="
              flex
              justify-between
              text-lg
              mb-4
            "
            >
              <span>Payment Method</span>

              <span>
                {paymentMethod}
              </span>
            </div>

            <hr className="my-4" />

            <div
              className="
              flex
              justify-between
              text-2xl
              font-bold
            "
            >
              <span>Total</span>

              <span>
                ₹{totalPrice}
              </span>
            </div>

            <button
              onClick={placeOrder}
              className="
              w-full
              bg-green-600
              text-white
              py-4
              rounded-xl
              mt-8
              text-lg
              font-semibold
            "
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Payment