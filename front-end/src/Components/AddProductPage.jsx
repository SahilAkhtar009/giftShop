import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddProductPage() {
  const [product, setProduct] = useState({
    name: "",
    image: "",
    price: "",
    countInStock: "",
    brand: "",
    category: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Token = JSON.parse(localStorage.getItem("userInfo"));

    try {
      await axios.post("http://localhost:5000/api/products/", product, {
        headers: {
          Authorization: `Bearer ${Token.token}`,
        },
      });
      alert("Product added successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error("Add product error:", err);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">
        Add New Product
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 shadow rounded-xl"
      >
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="countInStock"
          type="number"
          value={product.countInStock}
          onChange={handleChange}
          placeholder="Stock Count"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="brand"
          value={product.brand}
          onChange={handleChange}
          placeholder="Brand"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          rows="4"
          required
        />
        <button
          type="submit"
          className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600 w-full"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
