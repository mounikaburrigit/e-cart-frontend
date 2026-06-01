import {
  useEffect,
  useState,
} from 'react'

import axios from 'axios'

import {
  useParams,
} from 'react-router-dom'

import Navbar from '../components/Navbar'

const ProductDetails = () => {
  const [product, setProduct] =
    useState(null)

  const [darkMode, setDarkMode] =
    useState(false)

  const {id} = useParams()

  /* DARK MODE */

  useEffect(() => {
    const theme =
      localStorage.getItem(
        'darkMode'
      )

    if (theme === 'true') {
      setDarkMode(true)
    }
  }, [])

  /* GET PRODUCT */

  useEffect(() => {
    getProduct()
  }, [])

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `https://e-cart-backend-39er.onrender.com/api/products/${id}`
      )

      setProduct(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  /* ADD TO CART */

  const addToCart = () => {
    const existingCart =
      JSON.parse(
        localStorage.getItem(
          'cart'
        )
      ) || []

    const productExists =
      existingCart.find(
        item =>
          item._id ===
          product._id
      )

    if (productExists) {
      const updatedCart =
        existingCart.map(item =>
          item._id ===
          product._id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        )

      localStorage.setItem(
        'cart',
        JSON.stringify(
          updatedCart
        )
      )
    } else {
      existingCart.push({
        ...product,
        quantity: 1,
      })

      localStorage.setItem(
        'cart',
        JSON.stringify(
          existingCart
        )
      )
    }

    alert(
      'Product Added To Cart'
    )

    window.location.reload()
  }

  if (!product) {
    return (
      <h1 className="p-10 text-2xl">
        Loading...
      </h1>
    )
  }

  return (
    <>
      <Navbar />

      <div
        className={`
        min-h-screen
        p-6
        transition-all
        duration-300
        ${
          darkMode
            ? 'bg-black text-white'
            : 'bg-gray-100 text-black'
        }
      `}
      >
        <div
          className={`
          max-w-7xl
          mx-auto
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-10
          p-8
          rounded-2xl
          shadow-lg
          ${
            darkMode
              ? 'bg-gray-900 text-white'
              : 'bg-white text-black'
          }
        `}
        >
          {/* LEFT SIDE */}

          <div>
            <img
              src={product.image}
              alt={product.title}
              className="
              w-full
              h-[500px]
              object-cover
              rounded-2xl
            "
            />

            <div
              className="
              flex
              gap-4
              mt-6
            "
            >
              <button
                onClick={addToCart}
                className="
                flex-1
                bg-yellow-400
                py-4
                rounded-xl
                font-bold
                text-lg
                hover:bg-yellow-500
              "
              >
                Add To Cart
              </button>

              <button
                className="
                flex-1
                bg-orange-500
                text-white
                py-4
                rounded-xl
                font-bold
                text-lg
                hover:bg-orange-600
              "
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div>
            <h1
              className="
              text-4xl
              font-bold
            "
            >
              {product.title}
            </h1>

            <div
              className="
              flex
              items-center
              gap-3
              mt-4
            "
            >
              <span
                className="
                bg-green-600
                text-white
                px-3
                py-1
                rounded-lg
                font-semibold
              "
              >
                ⭐ {product.rating}
              </span>

              <span
                className={`
                text-lg
                ${
                  darkMode
                    ? 'text-gray-300'
                    : 'text-gray-600'
                }
              `}
              >
                {
                  product.numReviews
                } Reviews
              </span>
            </div>

            <h2
              className="
              text-4xl
              font-bold
              text-green-600
              mt-6
            "
            >
              ₹{product.price}
            </h2>

            <div
              className="
              mt-6
              space-y-3
            "
            >
              <p className="text-lg">
                <span className="font-bold">
                  Brand:
                </span>{' '}
                {product.brand}
              </p>

              <p className="text-lg">
                <span className="font-bold">
                  Category:
                </span>{' '}
                {product.category}
              </p>

              <p className="text-lg">
                <span className="font-bold">
                  Stock:
                </span>{' '}
                {product.stock}
              </p>
            </div>

            <div className="mt-8">
              <h2
                className="
                text-2xl
                font-bold
                mb-4
              "
              >
                Description
              </h2>

              <p
                className={`
                leading-8
                text-lg
                ${
                  darkMode
                    ? 'text-gray-300'
                    : 'text-gray-700'
                }
              `}
              >
                {
                  product.description
                }
              </p>
            </div>

            <div
              className="
              mt-10
              border-t
              pt-6
            "
            >
              <h2
                className="
                text-2xl
                font-bold
                mb-4
              "
              >
                Delivery
              </h2>

              <p className="text-lg">
                🚚 Free Delivery in
                3-5 Days
              </p>

              <p className="text-lg mt-2">
                🔒 Secure Payment
              </p>

              <p className="text-lg mt-2">
                ↩ 7 Days Replacement
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetails