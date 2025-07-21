import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ContextBox } from "../context/DataProvider";

export default function Home() {
  const { products, wishlist, addWishList, removeWishList, getProducts } =
    useContext(ContextBox);
  const [filtered, setFiltered] = useState([]);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    getProducts();
    setFiltered(products);
    if (user?.isAdmin) {
      navigate("/admin/dashboard");
    }
  }, [user, navigate]);

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      removeWishList(id);
    } else {
      addWishList(id);
    }
  };

  if (!products) return <h1 className="text-center mt-10">Loading...</h1>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🎉 Hero Banner */}
      <section className="bg-pink-100 py-12 text-center">
        <h2 className="text-4xl font-bold text-pink-700 mb-4">
          Find the Perfect Gift 🎉
        </h2>
        <p className="text-lg text-pink-800">
          Handpicked items for every occasion
        </p>
      </section>

      {/* 🔥 Offer Products Slider */}
      {products.some((p) => p.offerPrice && p.offerPrice < p.price) && (
        <section className="max-w-screen-xl mx-auto px-4 py-6">
          <h3 className="text-2xl font-semibold text-pink-700 mb-4">
            Special Offers 🎁
          </h3>
          <div className="overflow-x-auto">
            <div className="flex space-x-4 w-max">
              {products
                .filter(
                  (product) =>
                    product.offerPrice && product.offerPrice < product.price
                )
                .map((product) => (
                  <div
                    key={product._id}
                    className="min-w-[220px] bg-white rounded-xl shadow p-3 hover:shadow-md transition-all"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded"
                    />
                    <h4 className="mt-2 font-semibold text-gray-800 text-sm">
                      {product.name}
                    </h4>
                    <p className="text-xs text-gray-500">{product.category}</p>

                    <div className="mt-1">
                      <span className="text-pink-600 font-bold">
                        ₹{product.offerPrice}
                      </span>
                      <span className="ml-2 line-through text-sm text-gray-400">
                        ₹{product.price}
                      </span>
                    </div>

                    <button
                      onClick={() => navigate(`/single-product/${product._id}`)}
                      className="mt-2 w-full text-sm bg-pink-500 text-white px-4 py-1 rounded hover:bg-pink-600"
                    >
                      View
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* 🛍 Popular Gifts (Only Some Products) */}
      <main className="max-w-screen-xl mx-auto p-4">
        <h3 className="text-2xl font-semibold mb-4">Popular Gifts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.slice(0, 8).map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow p-4 hover:scale-105 transition-all relative"
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
                  Add
                </button>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product._id)}
                className={`mt-3 w-full text-sm px-4 py-2 rounded-full border ${
                  wishlist.includes(product._id)
                    ? "bg-red-100 text-red-600 border-red-300"
                    : "bg-gray-100 text-gray-600 border-gray-300"
                } hover:bg-pink-200 transition`}
              >
                {wishlist.includes(product._id)
                  ? "❤️ Remove from Wishlist"
                  : "🤍 Add to Wishlist"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
