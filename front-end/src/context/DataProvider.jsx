import axios from "axios";
import { Children, createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ContextBox = createContext();

function DataProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [status, setStatus] = useState(false);
  const [singlePoduct, setSingleProduct] = useState({});
  const [wishlist, setWishlist] = useState([]);

  const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

  const getProducts = () => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  };

  const fetchCart = async () => {
    try {
      const Token = JSON.parse(localStorage.getItem("userInfo"));

      // console.log(Token);
      const response = await axios.get("http://localhost:5000/api/cart/", {
        headers: {
          Authorization: `Bearer ${Token.token}`,
        },
      });
      const data = await response.data.items;
      setCartItems(data);
      const count = await data.reduce((sum, item) => sum + item.qty, 0);
      setCartCount(count);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  const AddToCart = async (product, qty) => {
    if (!token) return navigate("/Login");
    // Check if product already in cart
    const existingItemIndex = cartItems.findIndex(
      (item) => item.product._id === product._id
    );

    let updatedCart;
    if (existingItemIndex !== -1) {
      // Product exists, update quantity
      updatedCart = [...cartItems];
      updatedCart[existingItemIndex].qty += qty;
      setCartItems(updatedCart);
    } else {
      // Product doesn't exist, add new
      updatedCart = [...cartItems, { product, qty, id: Date.now() }];
      setCartItems(updatedCart);
    }
    toast.success("🛒 Added to cart!", { icon: "✅" });

    // alert(`${qty} item(s) of "${product.name}" added to cart`);

    await axios
      .post(
        "http://localhost:5000/api/cart/",
        { product, qty },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      .catch((err) => {
        toast.error("Failed to add to cart.");
        console.error("Cart error", err);
        alert("Failed to add to cart.");
      });
    fetchCart();
  };
  useEffect(() => {
    fetchCart();
    getProducts();
  }, [status]);

  const removeCartItems = async (productId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product._id !== productId)
    );
    try {
      await axios.delete(`http://localhost:5000/api/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCart();
    } catch (err) {
      console.error("Remove failed:", err);
    }
  };

  const addWishList = async (id) => {
    setWishlist((pre) => [...pre, id]);
    toast.info("Added to wishlist");
    await axios.post(
      `http://localhost:5000/api/wishlist/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchWishlist();
  };

  const removeWishList = async (id) => {
    setWishlist((prev) => prev.filter((item) => item !== id));
    toast.warning("Removed from wishlist");
    await axios.delete(`http://localhost:5000/api/wishlist/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    await fetchWishlist();
  };

  const fetchWishlist = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const ids = res.data.map((item) => item._id);
      setWishlist(ids);

      const data = products.filter((p) => wishlist.includes(p._id));
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchWishlist();
    }
  }, [status]);

  return (
    <ContextBox
      value={{
        products,
        setProducts,
        cartItems,
        setCartItems,
        orders,
        setOrders,
        cartCount,
        setCartCount,
        status,
        setStatus,
        singlePoduct,
        setSingleProduct,
        wishlist,
        setWishlist,
        addWishList,
        removeWishList,
        fetchWishlist,
        fetchCart,
        getProducts,
        AddToCart,
        removeCartItems,
      }}
    >
      {children}
    </ContextBox>
  );
}

export default DataProvider;
