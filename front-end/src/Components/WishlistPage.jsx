import { useContext, useEffect } from "react";
import { ContextBox } from "../context/DataProvider";
import { useNavigate } from "react-router-dom";

export default function WishlistPage() {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

  const { products, wishlist, fetchWishlist, getProducts, removeWishList } =
    useContext(ContextBox);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getProducts();
      fetchWishlist();
    }
  }, [token]);

  const wishlistItems = products.filter((p) => wishlist.includes(p._id));

  if (!token) return null;

  if (wishlistItems.length === 0)
    return (
      <div className="text-center py-20 text-gray-600">
        <h2 className="text-3xl font-semibold mb-2">
          Your Wishlist is Empty 😔
        </h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
        >
          Browse Products
        </button>
      </div>
    );

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist ❤️</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow p-4 relative"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />
            <h4 className="mt-2 text-lg font-bold text-gray-800">
              {product.name}
            </h4>
            <p className="text-sm text-gray-600">{product.category}</p>

            <div className="mt-2 flex justify-between items-center">
              <div>
                {product.offerPrice ? (
                  <div className="flex flex-col">
                    <span className="text-pink-600 font-bold">
                      ₹{product.offerPrice}
                    </span>
                    <span className="text-gray-400 text-sm line-through">
                      ₹{product.price}
                    </span>
                  </div>
                ) : (
                  <span className="text-pink-600 font-bold">
                    ₹{product.price}
                  </span>
                )}
              </div>
              <button
                onClick={() => navigate(`/single-product/${product._id}`)}
                className="bg-pink-500 text-white px-4 py-1 rounded hover:bg-pink-600"
              >
                View
              </button>
            </div>

            <button
              onClick={() => removeWishList(product._id)}
              className="mt-3 w-full text-sm px-4 py-2 rounded-full border bg-red-100 text-red-600 border-red-300 hover:bg-red-200 transition"
            >
              Remove from Wishlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
