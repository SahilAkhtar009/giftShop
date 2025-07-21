import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(name, email.toLowerCase, password, isAdmin);
    try {
      const res = await axios.post("https://giftshop-backend-9q1n.onrender.com/api/users/register", {
        name,
        email,
        password,
        isAdmin,
      });

      localStorage.setItem("userToken", res.data.token);
      alert("Registered successfully");
      navigate("/Login");
    } catch (err) {
      alert(err?.response?.data || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">
          Register
        </h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />

        <label className="flex items-center mb-4 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            className="mr-2"
          />
          Register as Admin
        </label>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
        >
          Register
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?
          <Link
            to="/login"
            className="text-pink-500 hover:underline ml-1 font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
