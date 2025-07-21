import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ContextBox } from "../context/DataProvider";

export default function SingleOrderPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { cartItems, status, setStatus, setSingleProduct, AddToCart } =
    useContext(ContextBox);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    AddToCart(product, qty);
    // const Token = JSON.parse(localStorage.getItem("userInfo"));
    // if (!Token) return navigate("/Login");

    // alert(`${qty} item(s) of "${product.name}" added to cart`);

    // axios
    //   .post(
    //     "http://localhost:5000/api/cart/",
    //     { product, qty },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${Token.token}`,
    //       },
    //     }
    //   )
    //   .then(() => setStatus(!status))
    //   .catch((err) => {
    //     console.error("Cart error", err);
    //     alert("Failed to add to cart.");
    //   });
  };

  const handleOrderNow = () => {
    const Token = JSON.parse(localStorage.getItem("userInfo"));
    if (!Token) return navigate("/Login");

    // Optionally call order API here instead of navigate
    setSingleProduct({ product, qty });
    navigate(`/single-checkout/${id}`);
  };

  if (!product) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover rounded-xl"
        />
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {product.name}
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Category: {product.category}
          </p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="text-2xl text-pink-600 font-bold mb-6">
            ₹{product.offerPrice > 0 ? product.offerPrice : product.price}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <label htmlFor="qty" className="text-sm text-gray-700">
              Qty:
            </label>
            <select
              id="qty"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="border border-gray-300 px-2 py-1 rounded"
            >
              {[...Array(10).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleAddToCart(product)}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-2 rounded"
            >
              Add to Cart
            </button>

            <button
              onClick={handleOrderNow}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
