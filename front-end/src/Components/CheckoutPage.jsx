import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  // const [address, setAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const Token = JSON.parse(localStorage.getItem("userInfo"));

        const response = await axios.get("http://localhost:5000/api/cart/", {
          headers: {
            Authorization: `Bearer ${Token.token}`,
          },
        });

        setCartItems(response.data.items);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };

    fetchCart();
  }, []);

  const handlePlaceOrder = async () => {
    const Token = JSON.parse(localStorage.getItem("userInfo"));
    if (!Token) return alert("Please login first.");

    try {
      const config = { headers: { Authorization: `Bearer ${Token.token}` } };

      const orderData = {
        orderItems: cartItems.map((item) => ({
          name: item.product.name,
          image: item.product.image,
          price: item.product.price,
          product: item.product._id,
          qty: item.qty,
        })),

        shippingAddress,
        paymentMethod,
        totalPrice: cartItems.reduce(
          (sum, item) => sum + item.product.price * item.qty,
          0
        ),
      };

      await axios.post("http://localhost:5000/api/orders/", orderData, config);
      localStorage.removeItem("giftshop-cart");
      // alert("Order placed successfully!");
      navigate("/order-success");
    } catch (err) {
      alert(err.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <h2 className="text-2xl font-bold text-pink-600 mb-6">Checkout</h2>

      {/* Shipping Address */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
        <input
          type="text"
          placeholder="Address"
          value={shippingAddress.address}
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, address: e.target.value })
          }
          className="border border-gray-300 p-2 rounded"
        />

        <input
          type="text"
          placeholder="City"
          value={shippingAddress.city}
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, city: e.target.value })
          }
          className="border border-gray-300 p-2 rounded"
        />

        <input
          type="text"
          placeholder="Postal Code"
          value={shippingAddress.postalCode}
          onChange={(e) =>
            setShippingAddress({
              ...shippingAddress,
              postalCode: e.target.value,
            })
          }
          className="border border-gray-300 p-2 rounded"
        />

        <input
          type="text"
          placeholder="Country"
          value={shippingAddress.country}
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, country: e.target.value })
          }
          className="border border-gray-300 p-2 rounded"
        />
      </div>

      {/* Payment Method */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option>Cash on Delivery</option>
          <option>Online Payment</option>
        </select>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between text-sm mb-1">
            <span>
              {item.product.name} x {item.qty}
            </span>
            <span>₹{item.product.price * item.qty}</span>
          </div>
        ))}
        <div className="border-t pt-2 mt-2 flex justify-between font-bold">
          <span>Total:</span>
          <span>
            ₹
            {cartItems.reduce(
              (sum, item) => sum + item.product.price * item.qty,
              0
            )}
          </span>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
      >
        Place Order
      </button>
    </div>
  );
}
