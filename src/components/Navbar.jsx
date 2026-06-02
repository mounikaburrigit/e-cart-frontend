import { FaShoppingCart, FaSearch, FaUser, FaUserCircle } from "react-icons/fa";

import { MdLocationOn, MdFavoriteBorder } from "react-icons/md";

import { IoPhonePortraitOutline, IoGridOutline } from "react-icons/io5";

import { RiTShirt2Line, RiBeautyLine } from "react-icons/ri";

import { BsBoxSeam, BsMoonStars, BsSun } from "react-icons/bs";

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

const Navbar = ({ search, setSearch, darkMode, setDarkMode }) => {
  const navigate = useNavigate();

  /* LOGIN STATE */

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("TOKEN:", localStorage.getItem("token"));

  console.log("isLoggedIn:", isLoggedIn);

  /* DROPDOWN */

  const [showDropdown, setShowDropdown] = useState(false);

  /* TOKEN CHECK */

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  /* LOGOUT */

  const logout = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);

    navigate("/login");
  };

  /* CART */

  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  return (
    <>
      <nav
        className={`sticky top-0 z-50 shadow-md ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        {/* TOP LOCATION BAR */}

        <div className="flex items-center justify-between px-4 py-2 border-b text-sm">
          <div className="flex items-center gap-1">
            <MdLocationOn className="text-red-500" />
            <span>Location not set</span>
          </div>

          <button className="text-blue-600 font-semibold">
            Select Delivery
          </button>
        </div>

        {/* MAIN NAVBAR */}

        <div className="max-w-7xl mx-auto px-3 py-3">
          <div className="flex items-center justify-between gap-3">
            {/* LOGO */}

            <h1
              onClick={() => navigate("/")}
              className="text-2xl md:text-3xl font-bold text-blue-600 cursor-pointer"
            >
              ShopX
            </h1>

            {/* SEARCH */}

            <div
              className={`hidden md:flex flex-1 max-w-2xl items-center rounded-2xl border px-4 py-3 ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <FaSearch className="text-gray-400" />

              <input
                type="text"
                placeholder="Search for products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none flex-1 ml-3"
              />
            </div>

            {/* RIGHT SECTION */}

            <div className="flex items-center gap-5 text-xl">
              {/* PROFILE */}

              <div className="relative">
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="flex items-center gap-2"
                    >
                      <FaUserCircle className="text-2xl" />

                      <span className="hidden lg:block text-sm">
                        {JSON.parse(localStorage.getItem("user"))?.name ||
                          "Profile"}
                      </span>
                    </button>

                    {showDropdown && (
                      <div className="absolute right-0 mt-4 w-56 bg-white text-black rounded-2xl shadow-2xl overflow-hidden">
                        <button
                          onClick={() => navigate("/profile")}
                          className="w-full text-left px-5 py-3 hover:bg-gray-100"
                        >
                          My Profile
                        </button>

                        <button
                          onClick={() => navigate("/cart")}
                          className="w-full text-left px-5 py-3 hover:bg-gray-100"
                        >
                          My Orders
                        </button>

                        <button
                          onClick={() => navigate("/wishlist")}
                          className="w-full text-left px-5 py-3 hover:bg-gray-100"
                        >
                          Wishlist
                        </button>

                        <button
                          onClick={logout}
                          className="w-full text-left px-5 py-3 text-red-500 hover:bg-red-50"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-2"
                  >
                    <FaUser />
                    <span className="hidden md:block">Login</span>
                  </button>
                )}
              </div>

              {/* WISHLIST */}

              <button
                onClick={() => navigate("/wishlist")}
                className="hidden md:flex items-center gap-2"
              >
                <MdFavoriteBorder />
                <span>Wishlist</span>
              </button>

              {/* DARK MODE */}

              <button onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <BsSun /> : <BsMoonStars />}
              </button>

              {/* CART */}

              <button
                onClick={() => navigate("/cart")}
                className="relative flex items-center gap-2"
              >
                <FaShoppingCart />

                <span className="hidden md:block">Cart</span>

                <span className="absolute -top-2 -right-2 bg-red-500 text-white min-w-[18px] h-[18px] flex items-center justify-center text-[10px] rounded-full font-semibold">
                  {cartItems.length}
                </span>
              </button>
            </div>
          </div>

          {/* MOBILE SEARCH */}

          <div className="md:hidden mt-3">
            <div
              className={`flex items-center rounded-2xl border px-4 py-3 ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <FaSearch className="text-gray-400" />

              <input
                type="text"
                placeholder="Search for products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none flex-1 ml-3"
              />
            </div>
          </div>
        </div>

        {/* CATEGORY ROW */}

        <div className="w-full overflow-x-auto border-y bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between min-w-max px-3 py-3 gap-6">
            <div className="flex flex-col items-center cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <BsBoxSeam className="text-blue-600 text-2xl" />
              </div>
              <span className="text-xs mt-2 font-medium">For You</span>
            </div>

            <div className="flex flex-col items-center cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center">
                <RiTShirt2Line className="text-pink-600 text-2xl" />
              </div>
              <span className="text-xs mt-2 font-medium">Fashion</span>
            </div>

            <div className="flex flex-col items-center cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <IoPhonePortraitOutline className="text-green-600 text-2xl" />
              </div>
              <span className="text-xs mt-2 font-medium">Mobiles</span>
            </div>

            <div className="flex flex-col items-center cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center">
                <RiBeautyLine className="text-yellow-600 text-2xl" />
              </div>
              <span className="text-xs mt-2 font-medium">Beauty</span>
            </div>

            <div className="flex flex-col items-center cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                <IoGridOutline className="text-orange-600 text-2xl" />
              </div>
              <span className="text-xs mt-2 font-medium">More</span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
