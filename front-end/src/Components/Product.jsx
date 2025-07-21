import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ContextBox } from "../context/DataProvider";

export default function Product() {
  // const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sortType, setSortType] = useState("default");
  const [onlyOffers, setOnlyOffers] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  // const [wishlist, setWishlist] = useState([]);

  const {
    wishlist,
    removeWishList,
    addWishList,
    AddToCart,
    products,
    setProducts,
  } = useContext(ContextBox);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://giftshop-backend-9q1n.onrender.com/api/products")
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleAddToCart = (product, qty = 1) => {
    AddToCart(product, qty);
  };

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      removeWishList(id);
    } else {
      addWishList(id);
    }
  };

  // 🔃 Apply Filters & Sorting
  useEffect(() => {
    let temp = [...products];

    if (onlyOffers) {
      temp = temp.filter((p) => p.offerPrice && p.offerPrice < p.price);
    }

    if (sortType === "low") {
      temp.sort(
        (a, b) => (a.offerPrice || a.price) - (b.offerPrice || b.price)
      );
    } else if (sortType === "high") {
      temp.sort(
        (a, b) => (b.offerPrice || b.price) - (a.offerPrice || a.price)
      );
    } else if (sortType === "discount") {
      temp.sort((a, b) => {
        const discountA = a.price && a.offerPrice ? a.price - a.offerPrice : 0;
        const discountB = b.price && b.offerPrice ? b.price - b.offerPrice : 0;
        return discountB - discountA;
      });
    }

    setFiltered(temp);
  }, [products, onlyOffers, sortType]);
  const categories = [
    "All",
    "Birthday",
    "Anniversary",
    "For Him",
    "For Her",
    "Personalized",
    "Decor",
    "Gadgets",
  ];
  const handleCategory = (cat) => {
    setActiveCategory(cat);
    setFiltered(
      cat === "All" ? products : products.filter((p) => p.category === cat)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-pink-600 text-center">
          All Products
        </h2>

        {/* 🔘 Sorting & Filtering Controls */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={onlyOffers}
              onChange={(e) => setOnlyOffers(e.target.checked)}
              className="accent-pink-500"
            />
            <label className="text-sm text-gray-700 font-bold">
              Only Offers
            </label>
          </div>
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border rounded px-3 py-1 text-sm"
          >
            <option value="default">Default</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="discount">Biggest Discount</option>
          </select>
        </div>

        {/* 🔄 Category Slider */}
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <div className="overflow-x-auto">
            <div className="flex space-x-4 w-max">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={`px-4 py-2 rounded-full border whitespace-nowrap 
                  ${
                    activeCategory === cat
                      ? "bg-pink-500 text-white"
                      : "bg-white text-pink-600 border-pink-300"
                  } hover:bg-pink-400 hover:text-white transition`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* 🛍 Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition duration-300"
            >
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md"
                />
              </Link>

              <h3 className="mt-2 font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600">{product.category}</p>

              <div className="mt-2">
                {product.offerPrice > 0 ? (
                  <>
                    <span className="text-gray-500 line-through mr-2">
                      ₹{product.price}
                    </span>
                    <span className="text-pink-600 font-bold text-lg">
                      ₹{product.offerPrice}
                    </span>
                  </>
                ) : (
                  <span className="text-pink-600 font-bold text-lg">
                    ₹{product.price}
                  </span>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  className="flex-1 bg-pink-500 text-white py-1 rounded hover:bg-pink-600 text-sm"
                  onClick={() => handleAddToCart(product)}
                >
                  Add
                </button>
                <button
                  className="flex-1 bg-green-500 text-white py-1 rounded hover:bg-green-600 text-sm"
                  onClick={() => navigate(`/single-product/${product._id}`)}
                >
                  Order
                </button>
              </div>

              {/* ❤️ Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product._id)}
                className={`mt-3 w-full text-sm px-4 py-1 rounded-full border ${
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
      </div>
    </div>
  );
}
