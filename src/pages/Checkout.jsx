import {
  useEffect,
  useState,
} from 'react'

import Navbar from '../components/Navbar'
import {useNavigate} from 'react-router-dom'

const Checkout = () => {
  const [cartItems, setCartItems] =
    useState([])
    const navigate = useNavigate()

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
          Checkout
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
                Delivery Address
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="
                  w-full
                  border
                  p-4
                  rounded-xl
                  outline-none
                "
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  className="
                  w-full
                  border
                  p-4
                  rounded-xl
                  outline-none
                "
                />

                <textarea
                  placeholder="Full Address"
                  rows="5"
                  className="
                  w-full
                  border
                  p-4
                  rounded-xl
                  outline-none
                "
                />
              </div>

              <h2
                className="
                text-2xl
                font-bold
                mt-10
                mb-6
              "
              >
                Order Items
              </h2>

              <div className="space-y-5">
                {cartItems.map(item => (
                  <div
                    key={item._id}
                    className="
                    flex
                    items-center
                    gap-4
                    border-b
                    pb-4
                  "
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="
                      w-24
                      h-24
                      object-cover
                      rounded-xl
                    "
                    />

                    <div>
                      <h2
                        className="
                        text-xl
                        font-bold
                      "
                      >
                        {item.title}
                      </h2>

                      <p className="mt-2">
                        Qty:
                        {item.quantity}
                      </p>

                      <p
                        className="
                        text-green-600
                        font-bold
                        mt-2
                      "
                      >
                        ₹
                        {item.price *
                          item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
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
              Order Summary
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
              <span>Delivery</span>

              <span>FREE</span>
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
  onClick={() =>
    navigate('/payment')
  }
  className="
  w-full
  bg-orange-500
  text-white
  py-4
  rounded-xl
  mt-8
  text-lg
  font-semibold
"
>
  Proceed To Payment
</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout