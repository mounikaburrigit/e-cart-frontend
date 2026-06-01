/* eslint-disable no-useless-assignment */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/immutability */
import {useEffect, useState} from 'react'

import axios from 'axios'

import {useNavigate} from 'react-router-dom'

import {
  FaHeart,
  FaRegHeart,
} from 'react-icons/fa'

import Navbar from '../components/Navbar'

import Categories from '../components/Categories'

const Home = () => {
  const [products, setProducts] =
    useState([])

  const [search, setSearch] =
    useState('')

  const [sortOption, setSortOption] =
    useState('')

  const [darkMode, setDarkMode] =
    useState(false)

  const [wishlist, setWishlist] =
    useState([])

  const navigate = useNavigate()

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

  /* GET PRODUCTS */

  useEffect(() => {
    getProducts('')
  }, [])

  /* GET WISHLIST */

  useEffect(() => {
    const storedWishlist =
      JSON.parse(
        localStorage.getItem(
          'wishlist'
        )
      ) || []

    setWishlist(
      storedWishlist
    )
  }, [])

  /* SAVE DARK MODE */

  useEffect(() => {
    localStorage.setItem(
      'darkMode',
      darkMode
    )
  }, [darkMode])

  /* FETCH PRODUCTS */

  const getProducts = async category => {
    try {
      let url =
        'https://e-cart-backend-39er.onrender.com/api/products'

      if (category) {
        url += `?category=${category}`
      }

      const response = await axios.get(
        url
      )

      setProducts(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  /* TOGGLE WISHLIST */

  const addToWishlist = product => {
    const existingWishlist =
      JSON.parse(
        localStorage.getItem(
          'wishlist'
        )
      ) || []

    const isExists =
      existingWishlist.find(
        item =>
          item._id ===
          product._id
      )

    let updatedWishlist = []

    if (isExists) {
      updatedWishlist =
        existingWishlist.filter(
          item =>
            item._id !==
            product._id
        )
    } else {
      updatedWishlist = [
        ...existingWishlist,
        product,
      ]
    }

    localStorage.setItem(
      'wishlist',
      JSON.stringify(
        updatedWishlist
      )
    )

    setWishlist(updatedWishlist)
  }

  /* SEARCH */

  const filteredProducts =
    products.filter(product =>
      product.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    )

  /* SORT */

  const sortedProducts = [
    ...filteredProducts,
  ]

  if (sortOption === 'low') {
    sortedProducts.sort(
      (a, b) => a.price - b.price
    )
  }

  if (sortOption === 'high') {
    sortedProducts.sort(
      (a, b) => b.price - a.price
    )
  }

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

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
        <Categories
          getProducts={getProducts}
        />

        <div
          className="
          flex
          justify-between
          items-center
          mb-8
        "
        >
          <h1
            className="
            text-4xl
            font-bold
          "
          >
            Latest Products
          </h1>

          {/* SORT */}

          <select
            value={sortOption}
            onChange={e =>
              setSortOption(
                e.target.value
              )
            }
            className="
            border
            p-3
            rounded-xl
            outline-none
            bg-white
            text-black
          "
          >
            <option value="">
              Sort By
            </option>

            <option value="low">
              Price Low To High
            </option>

            <option value="high">
              Price High To Low
            </option>
          </select>
        </div>

        {/* PRODUCTS */}

        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6
        "
        >
          {sortedProducts.map(product => (
            <div
              key={product._id}
              className="
              bg-white
              rounded-2xl
              shadow-lg
              overflow-hidden
              hover:scale-105
              transition
              duration-300
              cursor-pointer
              relative
            "
            >
              {/* HEART */}

              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={e => {
                    e.stopPropagation()

                    addToWishlist(
                      product
                    )
                  }}
                  className="
                  bg-white
                  w-14
                  h-14
                  rounded-full
                  shadow-lg
                  flex
                  justify-center
                  items-center
                  text-2xl
                "
                >
                  {wishlist.some(
                    item =>
                      item._id ===
                      product._id
                  ) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-400" />
                  )}
                </button>
              </div>

              {/* CARD */}

              <div
                onClick={() =>
                  navigate(
                    `/product/${product._id}`
                  )
                }
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="
                  w-full
                  h-64
                  object-cover
                "
                />

                <div className="p-4">
                  <h2
                    className="
                    text-xl
                    font-bold
                    text-black
                  "
                  >
                    {product.title}
                  </h2>

                  <div
                    className="
                    flex
                    items-center
                    gap-2
                    mt-2
                  "
                  >
                    <span
                      className="
                      bg-green-600
                      text-white
                      px-2
                      py-1
                      rounded-md
                      text-sm
                    "
                    >
                      ⭐ {product.rating}
                    </span>

                    <span className="text-sm text-gray-600">
                      (
                      {
                        product.numReviews
                      }
                      )
                    </span>
                  </div>

                  <p
                    className="
                    text-gray-600
                    mt-2
                  "
                  >
                    {
                      product.description
                    }
                  </p>

                  <p
                    className="
                    text-2xl
                    font-bold
                    text-green-600
                    mt-4
                  "
                  >
                    ₹{product.price}
                  </p>

                  <button
                    className="
                    w-full
                    bg-black
                    text-white
                    py-3
                    rounded-xl
                    mt-4
                    hover:bg-gray-800
                  "
                  >
                    View Product
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home