import {
  FaUserCircle,
  FaShoppingBag,
  FaHeart,
  FaSignOutAlt,
} from 'react-icons/fa'

import {
  useNavigate,
} from 'react-router-dom'

import Navbar from '../components/Navbar'

const Profile = () => {
  const navigate = useNavigate()

  /* USER */

  const user =
    JSON.parse(
      localStorage.getItem('user')
    ) || {}

  /* LOGOUT */

  const logout = () => {
    localStorage.removeItem('token')

    localStorage.removeItem('user')

    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}

      <Navbar />

      {/* PROFILE */}

      <div className="max-w-6xl mx-auto p-4 md:p-8">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* SIDEBAR */}

          <div className="bg-white rounded-3xl shadow-lg p-6 h-fit">

            {/* USER */}

            <div className="flex flex-col items-center border-b pb-6">

              <FaUserCircle className="text-7xl text-blue-500 mb-4" />

              <h1 className="text-2xl font-bold">
                {user.name || 'User'}
              </h1>

              <p className="text-gray-500 mt-1">
                {user.email || 'No Email'}
              </p>

            </div>

            {/* MENU */}

            <div className="mt-6 space-y-4">

              <button
                onClick={() =>
                  navigate('/profile')
                }
                className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-100 transition duration-300"
              >
                <FaUserCircle />

                My Profile
              </button>

              <button
                onClick={() =>
                  navigate('/cart')
                }
                className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-100 transition duration-300"
              >
                <FaShoppingBag />

                My Orders
              </button>

              <button
                onClick={() =>
                  navigate('/wishlist')
                }
                className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-100 transition duration-300"
              >
                <FaHeart />

                Wishlist
              </button>

              <button
                onClick={logout}
                className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition duration-300"
              >
                <FaSignOutAlt />

                Logout
              </button>

            </div>
          </div>

          {/* DETAILS */}

          <div className="md:col-span-3 bg-white rounded-3xl shadow-lg p-6 md:p-10">

            <h1 className="text-4xl font-bold mb-10 text-gray-800">
              Personal Information
            </h1>

            {/* NAME */}

            <div className="mb-8">

              <label className="block text-lg font-semibold mb-3 text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                value={user.name || ''}
                readOnly
                className="w-full border border-gray-300 p-4 rounded-2xl bg-gray-50 outline-none"
              />

            </div>

            {/* EMAIL */}

            <div className="mb-8">

              <label className="block text-lg font-semibold mb-3 text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                value={user.email || ''}
                readOnly
                className="w-full border border-gray-300 p-4 rounded-2xl bg-gray-50 outline-none"
              />

            </div>

            {/* MOBILE */}

            {/* <div className="mb-8">

              <label className="block text-lg font-semibold mb-3 text-gray-700">
                Mobile Number
              </label>

              <input
                type="text"
                value="+91 9876543210"
                readOnly
                className="w-full border border-gray-300 p-4 rounded-2xl bg-gray-50 outline-none"
              />

            </div> */}

            {/* ADDRESS */}

            <div>

              <label className="block text-lg font-semibold mb-3 text-gray-700">
                Address
              </label>

              <textarea
                rows="4"
                readOnly
                value="Hyderabad, Telangana, India"
                className="w-full border border-gray-300 p-4 rounded-2xl bg-gray-50 outline-none"
              />

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Profile