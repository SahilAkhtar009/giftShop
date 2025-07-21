import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ContextBox } from "../context/DataProvider";

export function MyOrdersPage() {
  const { orders, setOrders, status, setStatus } = useContext(ContextBox);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const Token = JSON.parse(localStorage.getItem("userInfo"));
      if (!Token) {
        navigate("/login");
        return;
      }

      try {
        const config = {
          headers: { Authorization: `Bearer ${Token.token}` },
        };
        const res = await axios.get(
          "https://giftshop-backend-9q1n.onrender.com/api/orders/myorders",
          config
        );
        setOrders(res.data);
      } catch (err) {
        alert("Failed to load orders.");
      }
    };

    fetchOrders();
  }, [navigate, status]);

  const handleRemoveOrder = async (orderId) => {
    try {
      const Token = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: { Authorization: `Bearer ${Token.token}` },
      };

      await axios.delete(`https://giftshop-backend-9q1n.onrender.com/api/orders/${orderId}`, config);

      setOrders((prev) => prev.filter((order) => order._id !== orderId));
      setStatus((pre) => !pre);
    } catch (err) {
      alert("Failed to remove order.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h2 className="text-2xl font-bold text-pink-600 mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow rounded-xl p-4 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-3 text-sm text-gray-500">
                <span>Order ID: {order._id}</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>

              {/* STATUS BADGE */}
              <div className="mb-4">
                <span
                  className={`inline-block px-3 py-1 text-xs rounded-full font-semibold ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* ORDER ITEMS */}
              <div className="divide-y">
                {order.orderItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center py-2"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded border"
                      />
                      <div>
                        <h4 className="text-sm font-medium text-gray-800">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">
                      ₹{item.qty * (item.price || 0)}
                    </span>
                  </div>
                ))}
              </div>

              {/* TOTAL AND REMOVE */}
              <div className="flex justify-between items-center mt-4">
                <div className="font-bold text-gray-700">
                  Total: ₹
                  {order.orderItems.reduce(
                    (sum, item) => sum + item.qty * (item.price || 0),
                    0
                  )}
                </div>
                <button
                  onClick={() => handleRemoveOrder(order._id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
