import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContextBox } from "../context/DataProvider";

export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems, setCartItems, fetchCart, removeCartItems } =
    useContext(ContextBox);

  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = (id, qty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, qty: Number(qty) } : item
      )
    );
  };
  // remove product
  const removeFromCart = async (productId) => {
    // console.log(productId);
    removeCartItems(productId);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600 font-bold h-[70vh]">
        Your cart is empty 🛒
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-pink-600 mb-6">Shopping Cart</h2>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold text-gray-800">
                  {item.product.name}
                </h3>
                <p className="text-sm text-gray-500">₹{item.product.price}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <select
                value={item.qty}
                onChange={(e) => updateQty(item._id, e.target.value)}
                className="border border-gray-300 px-2 py-1 rounded"
              >
                {[...Array(10).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
              <button
                onClick={() => removeFromCart(item.product._id)}
                className="text-red-500 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right text-lg font-semibold text-gray-700">
        Total: ₹{totalPrice}
      </div>

      <div className="mt-4 text-right">
        <button
          onClick={handleCheckout}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
