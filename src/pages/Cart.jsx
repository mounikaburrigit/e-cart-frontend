import {
  useEffect,
  useState,
} from 'react'

import {
  FaTrash,
} from 'react-icons/fa'

import Navbar from '../components/Navbar'
import {useNavigate} from 'react-router-dom'


const Cart = () => {
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

  const updateCart = updatedCart => {
    setCartItems(updatedCart)

    localStorage.setItem(
      'cart',
      JSON.stringify(updatedCart)
    )
  }

  const increaseQuantity = id => {
    const updatedCart =
      cartItems.map(item =>
        item._id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )

    updateCart(updatedCart)
  }

  const decreaseQuantity = id => {
    const updatedCart =
      cartItems.map(item =>
        item._id === id
          ? {
              ...item,
              quantity:
                item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )

    updateCart(updatedCart)
  }

  const removeItem = id => {
    const updatedCart =
      cartItems.filter(
        item => item._id !== id
      )

    updateCart(updatedCart)
  }

  const totalPrice =
    cartItems.reduce(
      (total, item) =>
        total +
        item.price * item.quantity,
      0
    )

  /* EMPTY CART */

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />

        <div
          className="
          min-h-screen
          flex
          flex-col
          justify-center
          items-center
          bg-gray-100
        "
        >
          <h1
            className="
            text-4xl
            font-bold
            text-gray-700
          "
          >
            Your Cart Is Empty
          </h1>

          <p
            className="
            text-gray-500
            mt-4
            text-lg
          "
          >
            Add products to continue shopping
          </p>
        </div>
      </>
    )
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
          Shopping Cart
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

          <div className="lg:col-span-2 space-y-6">
            {cartItems.map(item => (
              <div
                key={item._id}
                className="
                bg-white
                rounded-2xl
                shadow-md
                p-4
                flex
                flex-col
                md:flex-row
                gap-6
              "
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="
                  w-40
                  h-40
                  object-cover
                  rounded-xl
                "
                />

                <div className="flex-1">
                  <h2
                    className="
                    text-2xl
                    font-bold
                  "
                  >
                    {item.title}
                  </h2>

                  <p
                    className="
                    text-gray-600
                    mt-2
                  "
                  >
                    {item.description}
                  </p>

                  <p
                    className="
                    text-2xl
                    text-green-600
                    font-bold
                    mt-4
                  "
                  >
                    ₹{item.price}
                  </p>

                  <p className="mt-2">
                    🚚 Delivery by Tomorrow
                  </p>

                  {/* QUANTITY */}

                  <div
                    className="
                    flex
                    items-center
                    gap-4
                    mt-5
                  "
                  >
                    <button
                      onClick={() =>
                        decreaseQuantity(
                          item._id
                        )
                      }
                      className="
                      bg-gray-200
                      px-4
                      py-2
                      rounded-lg
                      text-xl
                    "
                    >
                      -
                    </button>

                    <span className="text-xl font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(
                          item._id
                        )
                      }
                      className="
                      bg-gray-200
                      px-4
                      py-2
                      rounded-lg
                      text-xl
                    "
                    >
                      +
                    </button>

                    <button
                      onClick={() =>
                        removeItem(
                          item._id
                        )
                      }
                      className="
                      text-red-500
                      text-xl
                      ml-4
                    "
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
              Price Details
            </h2>

            <div
              className="
              flex
              justify-between
              text-lg
              mb-4
            "
            >
              <span>Total Items</span>

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
    navigate('/checkout')
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
  Proceed To Checkout
</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart