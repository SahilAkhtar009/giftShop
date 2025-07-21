import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      try {
        const res = await axios.get(
          "https://giftshop-backend-9q1n.onrender.com/api/admin/products",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to load products:", err);
        alert("Could not load products.");
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    navigate("/admin/products/create");
  };

  const handleRemoveProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

    try {
      await axios.delete(
        `http://localhost:5000/api/admin/products/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProducts((prev) =>
        prev.filter((product) => product._id !== productId)
      );
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Could not delete product.");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold text-pink-600 text-center sm:text-left">
          All Products
        </h2>
        <button
          onClick={handleAddProduct}
          className="mt-4 sm:mt-0 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          + Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500 text-center">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow text-sm sm:text-base">
            <thead className="bg-pink-100 text-pink-800">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Offer</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {products.map((product) => (
                <tr key={product._id} className="border-t hover:bg-pink-50">
                  <td className="p-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">₹{product.price}</td>
                  <td className="p-3 text-green-600 font-medium">
                    ₹{product.offerPrice || 0}
                  </td>
                  <td className="p-3">{product.countInStock}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/products/edit/${product._id}`)
                      }
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemoveProduct(product._id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
