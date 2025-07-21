import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContextBox } from "../context/DataProvider";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { cartCount, setCartCount, status, cartItems, wishlist } =
    useContext(ContextBox);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    setUser(JSON.parse(userInfo));
  }, [status]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    setCartCount(0);
    navigate("/login");
  };

  const NavLink = ({ to, label }) => (
    <Link to={to} className="block md:inline text-gray-600 hover:text-pink-500">
      {label}
    </Link>
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to={user?.isAdmin ? "/admin/dashboard" : "/"}
          className="text-2xl font-bold text-pink-600"
        >
          🏱 GiftShop
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          {user && user.isAdmin ? (
            ""
          ) : (
            <>
              <div className="relative">
                <Link to="/" className="text-gray-600 hover:text-pink-500">
                  Home
                </Link>
              </div>
              <div className="relative">
                <Link
                  to="/products"
                  className="text-gray-600 hover:text-pink-500"
                >
                  Products
                </Link>
              </div>
              <div className="relative">
                <Link to="/cart" className="text-gray-600 hover:text-pink-500">
                  Cart
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-4 bg-pink-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </div>
              {user && user.isAdmin ? (
                ""
              ) : (
                <Link
                  to="/wishlist"
                  className="text-gray-600 hover:text-pink-500 overflow-hidden"
                >
                  Wishlist ({wishlist.length})
                </Link>
              )}
            </>
          )}

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 text-gray-600 hover:text-pink-500 focus:outline-none border-1 px-2 py-1 rounded-full"
              >
                {user.name?.slice(0, 2).toUpperCase() || "NA"}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                  {!user.isAdmin && (
                    <Link
                      to="/my-orders"
                      className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Orders
                    </Link>
                  )}
                  {user.isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login" label="Login" />
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 flex flex-col  text-gray-600">
          {user && !user.isAdmin && (
            <>
              <Link to={"/"}>Home</Link>
              <Link to={"/products"}>Products</Link>
              <Link to="/cart">Cart({cartItems.length})</Link>
              <Link to="/wishlist">Wishlist({wishlist.length})</Link>
              <Link to="/my-orders">My Orders</Link>
            </>
          )}
          {user && user.isAdmin && (
            <NavLink to="/admin/dashboard" label="Admin Dashboard" />
          )}
          {user && (
            <button
              onClick={handleLogout}
              className="w-full text-left hover:text-red-500"
            >
              Logout
            </button>
          )}
          {!user && <NavLink to="/login" label="Login" />}
        </div>
      )}
    </header>
  );
}
