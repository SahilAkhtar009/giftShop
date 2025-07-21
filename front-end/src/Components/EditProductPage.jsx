import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    image: "",
    price: "",
    offerPrice: "", // ✅ Added
    countInStock: "",
    brand: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      try {
        const res = await axios.get(
          `https://giftshop-backend-9q1n.onrender.com/api/admin/products/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        alert("Failed to load product.");
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

    try {
      await axios.put(
        `https://giftshop-backend-9q1n.onrender.com/api/admin/products/${id}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8">
      <h2 className="text-center text-2xl sm:text-3xl font-bold text-pink-600 mb-6">
        Edit Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Offer Price</label>
            <input
              type="number"
              name="offerPrice"
              value={product.offerPrice}
              onChange={handleChange}
              placeholder="Offer Price"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Stock Count</label>
            <input
              type="number"
              name="countInStock"
              value={product.countInStock}
              onChange={handleChange}
              placeholder="Stock Count"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Brand</label>
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              placeholder="Brand"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            rows={4}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
