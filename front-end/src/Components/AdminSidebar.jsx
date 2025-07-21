import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaUser, FaBox, FaShoppingCart } from "react-icons/fa";

export default function AdminSidebar() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-md hover:bg-pink-100 transition ${
      pathname.includes(path) ? "bg-pink-200 text-pink-800 font-semibold" : ""
    }`;

  return (
    <aside className="w-full sm:w-60 bg-white border-r p-4">
      <h1 className="text-xl font-bold text-pink-600 mb-6">Admin Panel</h1>
      <nav className="space-y-2 text-sm">
        <Link to="/admin/dashboard" className={linkClass("dashboard")}>
          <FaTachometerAlt /> Dashboard
        </Link>
        <Link to="/admin/users" className={linkClass("users")}>
          <FaUser /> Users
        </Link>
        <Link to="/admin/products" className={linkClass("products")}>
          <FaBox /> Products
        </Link>
        <Link to="/admin/orders" className={linkClass("orders")}>
          <FaShoppingCart /> Orders
        </Link>
      </nav>
    </aside>
  );
}
