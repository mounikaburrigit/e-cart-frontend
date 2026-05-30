/* eslint-disable react-hooks/set-state-in-effect */
import {
  useEffect,
  useState,
} from 'react'

import {
  FaTrash,
  
} from 'react-icons/fa'

import Navbar from '../components/Navbar'

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] =
    useState([])

  useEffect(() => {
    const items =
      JSON.parse(
        localStorage.getItem(
          'wishlist'
        )
      ) || []

    setWishlistItems(items)
  }, [])

  /* REMOVE WISHLIST ITEM */

  const removeWishlistItem = id => {
    const updatedWishlist =
      wishlistItems.filter(
        item => item._id !== id
      )

    setWishlistItems(
      updatedWishlist
    )

    localStorage.setItem(
      'wishlist',
      JSON.stringify(
        updatedWishlist
      )
    )
  }

  /* EMPTY WISHLIST */

  if (wishlistItems.length === 0) {
    return (
      <>
        <Navbar />

        <div
          className="
          min-h-screen
          flex
          justify-center
          items-center
          bg-gray-100
        "
        >
          <h1
            className="
            text-4xl
            font-bold
            text-gray-500
          "
          >
            No Wishlist Products
          </h1>
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
          Wishlist
        </h1>

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
          {wishlistItems.map(item => (
            <div
              key={item._id}
              className="
              bg-white
              rounded-2xl
              shadow-lg
              overflow-hidden
            "
            >
              <img
                src={item.image}
                alt={item.title}
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
                  font-bold
                  text-green-600
                  mt-4
                "
                >
                  ₹{item.price}
                </p>

                <button
                  onClick={() =>
                    removeWishlistItem(
                      item._id
                    )
                  }
                  className="
                  w-full
                  bg-red-500
                  text-white
                  py-3
                  rounded-xl
                  mt-4
                  flex
                  justify-center
                  items-center
                  gap-2
                "
                >
                  <FaTrash />

                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Wishlist