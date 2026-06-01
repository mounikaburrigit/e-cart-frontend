import {useEffect, useState} from 'react'

import axios from 'axios'

const Categories = ({
  getProducts,
}) => {
  const [categories, setCategories] =
    useState([])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        'https://e-cart-backend-39er.onrender.com/api/categories'
      )

      setCategories(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-sm
      px-6
      py-5
      mb-8
    "
    >
      <div
        className="
        flex
        flex-wrap
        justify-center
        items-center
        gap-8
      "
      >
        {categories.map(category => (
          <div
            key={category._id}
            onClick={() => {
              if (
                category.name === 'Home'
              ) {
                getProducts()
              } else {
                getProducts(
                  category.name
                )
              }
            }}
            className="
            flex
            flex-col
            items-center
            cursor-pointer
            group
          "
          >
            <div
              className="
              w-16
              h-16
              rounded-full
              overflow-hidden
              border
              border-gray-200
              shadow-sm
              group-hover:shadow-lg
              group-hover:scale-105
              transition
              duration-300
            "
            >
              <img
                src={category.image}
                alt={category.name}
                className="
                w-full
                h-full
                object-cover
              "
              />
            </div>

            <p
              className="
              mt-3
              text-sm
              font-medium
              text-gray-700
              text-center
              whitespace-nowrap
              group-hover:text-blue-600
              transition
            "
            >
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories