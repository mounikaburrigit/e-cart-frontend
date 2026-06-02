import {useEffect, useState} from 'react'
import axios from 'axios'

import {
  FaHome,
  FaMobileAlt,
  FaLaptop,
} from 'react-icons/fa'

import {
  MdOutlineLocalGroceryStore,
  MdOutlineChair,
} from 'react-icons/md'

import {RiTShirt2Line} from 'react-icons/ri'
import {GiLipstick} from 'react-icons/gi'
import {BsGrid} from 'react-icons/bs'

const Categories = ({getProducts}) => {
  const [categories, setCategories] = useState([])

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

  const getCategoryIcon = name => {
    switch (name?.toLowerCase()) {
      case 'home':
        return <FaHome className="text-2xl text-blue-600" />

      case 'grocery':
        return (
          <MdOutlineLocalGroceryStore className="text-2xl text-green-600" />
        )

      case 'mobiles':
        return (
          <FaMobileAlt className="text-2xl text-purple-600" />
        )

      case 'fashion':
        return (
          <RiTShirt2Line className="text-2xl text-pink-600" />
        )

      case 'beauty':
        return (
          <GiLipstick className="text-2xl text-yellow-600" />
        )

      case 'electronics':
        return (
          <FaLaptop className="text-2xl text-indigo-600" />
        )

      case 'furniture':
        return (
          <MdOutlineChair className="text-2xl text-orange-600" />
        )

      default:
        return <BsGrid className="text-2xl text-red-600" />
    }
  }

  return (
    <div className="bg-white shadow-sm border-y mb-6 overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-8 min-w-max px-4 py-4">
        {categories.map(category => (
          <div
            key={category._id}
            onClick={() => {
              if (category.name === 'Home') {
                getProducts()
              } else {
                getProducts(category.name)
              }
            }}
            className="
              flex
              flex-col
              items-center
              cursor-pointer
              group
              min-w-[80px]
            "
          >
            <div
              className="
                w-14
                h-14
                rounded-xl
                bg-gray-100
                flex
                items-center
                justify-center
                shadow-sm
                group-hover:shadow-lg
                group-hover:scale-110
                transition-all
                duration-300
              "
            >
              {getCategoryIcon(category.name)}
            </div>

            <p
              className="
                mt-2
                text-xs
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