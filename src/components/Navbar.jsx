import {
  FaShoppingCart,
  FaSearch,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";

import {
  MdFavoriteBorder,
  MdLocationOn,
} from "react-icons/md";

import {
  BsMoonStars,
  BsSun,
  BsGrid,
  BsBoxSeam,
} from "react-icons/bs";

import {
  RiTShirt2Line,
  RiBeautyLine,
} from "react-icons/ri";

import { IoPhonePortraitOutline } from "react-icons/io5";

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
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
    <nav
  className={`sticky top-0 z-50 shadow-md ${
    darkMode
      ? "bg-gray-900 text-white"
      : "bg-white text-black"
  }`}
>
  <div className="max-w-7xl mx-auto px-4 py-3">

    {/* TOP ROW */}

    <div className="flex items-center justify-between gap-4">

      {/* LOGO */}

      <h1
        onClick={() => navigate("/")}
        className="
          text-3xl
          font-extrabold
          text-blue-600
          cursor-pointer
          hover:scale-105
          transition-all
          duration-300
        "
      >
        ShopX
      </h1>

      {/* SEARCH */}

      <div
        className={`
          hidden md:flex
          flex-1
          max-w-2xl
          items-center
          px-4
          py-3
          rounded-2xl
          border
          ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-50 border-gray-200"
          }
        `}
      >
        <FaSearch className="text-gray-400" />

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            flex-1
            ml-3
            bg-transparent
            outline-none
          "
        />
      </div>

      {/* RIGHT SIDE */}

      <div className="flex items-center gap-5 text-xl">

        <button
          onClick={() => navigate("/wishlist")}
          className="hover:scale-110 transition"
        >
          <MdFavoriteBorder />
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="hover:scale-110 transition"
        >
          {darkMode ? <BsSun /> : <BsMoonStars />}
        </button>

        <button
          onClick={() => navigate("/cart")}
          className="
            relative
            hover:scale-110
            transition
          "
        >
          <FaShoppingCart />

          <span
            className="
              absolute
              -top-2
              -right-2
              bg-red-500
              text-white
              text-[10px]
              min-w-[18px]
              h-[18px]
              flex
              items-center
              justify-center
              rounded-full
            "
          >
            {cartItems.length}
          </span>
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="hover:scale-110 transition"
        >
          <FaUserCircle />
        </button>

      </div>
    </div>

    {/* MOBILE SEARCH */}

    <div className="md:hidden mt-3">
      <div
        className={`
          flex
          items-center
          px-4
          py-3
          rounded-2xl
          border
          ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-50 border-gray-200"
          }
        `}
      >
        <FaSearch className="text-gray-400" />

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            flex-1
            ml-3
            bg-transparent
            outline-none
          "
        />
      </div>
    </div>

  </div>
</nav>
  );
};

export default Navbar;
