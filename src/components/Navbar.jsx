import {
  FaShoppingCart,
  FaSearch,
  FaUser,
  FaHeart,
  FaMoon,
  FaSun,
  FaUserCircle
} from "react-icons/fa";


import {
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

const Navbar = ({
  search,
  setSearch,
  darkMode,
  setDarkMode,
}) => {
  const navigate = useNavigate();

  /* LOGIN STATE */

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  /* TOKEN CHECK */

  useEffect(() => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  /* LOGOUT */

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    setIsLoggedIn(false);

    navigate("/login");
  };

  /* CART */

  const cartItems =
    JSON.parse(
      localStorage.getItem(
        "cart"
      )
    ) || [];

  return (
    <nav
      className={`
      sticky
      top-0
      z-50
      shadow-md
      ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-white text-black"
      }
    `}
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-4
        py-4
        flex
        items-center
        justify-between
        gap-4
      "
      >
        {/* LOGO */}

        <h1
          onClick={() =>
            navigate("/")
          }
          className="
          text-3xl
          font-bold
          text-blue-600
          cursor-pointer
        "
        >
          ShopX
        </h1>

        {/* SEARCH */}

        <div
          className={`
          flex
          items-center
          rounded-xl
          px-4
          py-3
          flex-1
          max-w-2xl
          ${
            darkMode
              ? "bg-gray-800"
              : "bg-gray-100"
          }
        `}
        >
          <FaSearch className="text-gray-500" />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e =>
              setSearch(
                e.target.value
              )
            }
            className="
            bg-transparent
            outline-none
            w-full
            ml-3
          "
          />
        </div>

        {/* RIGHT SIDE */}

        <div
          className="
          flex
          items-center
          gap-6
          text-xl
        "
        >
          {/* LOGIN / LOGOUT */}

          {isLoggedIn ? (
            <button
              onClick={logout}
              className="
              flex
              items-center
              gap-2
            "
            >
            <FaUserCircle/>

              <span className="hidden md:block">
                Logout
              </span>
            </button>
          ) : (
            <button
              onClick={() =>
                navigate("/login")
              }
              className="
              flex
              items-center
              gap-2
            "
            >
              <FaUser />

              <span className="hidden md:block">
                Login
              </span>
            </button>
          )}

          {/* WISHLIST */}

          <button
            onClick={() =>
              navigate("/wishlist")
            }
            className="
            flex
            items-center
            gap-2
          "
          >
            <FaHeart />

            <span className="hidden md:block">
              Wishlist
            </span>
          </button>

          {/* DARK MODE */}

          <button
            onClick={() =>
              setDarkMode(
                !darkMode
              )
            }
            className="text-xl"
          >
            {darkMode ? (
              <FaSun />
            ) : (
              <FaMoon />
            )}
          </button>

          {/* CART */}

          <button
            onClick={() =>
              navigate("/cart")
            }
            className="
            flex
            items-center
            gap-2
            relative
          "
          >
            <FaShoppingCart />

            <span className="hidden md:block">
              Cart
            </span>

            <span
              className="
              absolute
              -top-2
              -right-3
              bg-red-500
              text-white
              text-xs
              px-2
              rounded-full
            "
            >
              {cartItems.length}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;