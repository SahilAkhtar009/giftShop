import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AdminDashboard() {
  const [summary, setSummary] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  });

  useEffect(() => {
    const Token = JSON.parse(localStorage.getItem("userInfo"));
    axios
      .get("http://localhost:5000/api/admin/summary", {
        headers: { Authorization: `Bearer ${Token?.token}` },
      })
      .then((res) => setSummary(res.data))
      .catch((err) => console.error("Dashboard load failed", err));
  }, []);

  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 bg-gray-50">
        <h2 className="text-2xl font-bold text-pink-600 mb-6">
          Admin Dashboard
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-white">
          <Link to="/admin/users" className="bg-blue-500 p-4 rounded-xl shadow">
            <p className="text-lg">Users</p>
            <h3 className="text-2xl font-bold">{summary.users}</h3>
          </Link>
          <Link
            to="/admin/products"
            className="bg-green-500 p-4 rounded-xl shadow"
          >
            <p className="text-lg">Products</p>
            <h3 className="text-2xl font-bold">{summary.products}</h3>
          </Link>
          <Link
            to="/admin/orders"
            className="bg-yellow-500 p-4 rounded-xl shadow"
          >
            <p className="text-lg">Orders</p>
            <h3 className="text-2xl font-bold">{summary.orders}</h3>
          </Link>
          <div className="bg-purple-500 p-4 rounded-xl shadow">
            <p className="text-lg">Revenue</p>
            <h3 className="text-2xl font-bold">₹{summary.revenue}</h3>
          </div>
        </div>
      </main>
    </div>
  );
}
