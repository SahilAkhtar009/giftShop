import { Cart } from "../models/cartModel.js";

// GET /api/cart
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product"
  );
  res.json(cart || { user: req.user._id, items: [] });
};

// POST /api/cart (add or update item)
export const addToCart = async (req, res) => {
  const { product, qty } = req.body;
  const productId = typeof product === "object" ? product._id : product;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({
      user: req.user._id,
      items: [{ product: productId, qty }],
    });
  } else {
    const existingItem = cart.items.find(
      (item) => String(item.product) === String(productId)
    );

    if (existingItem) {
      existingItem.qty += qty;
    } else {
      cart.items.push({ product: productId, qty });
    }
  }

  await cart.save();
  res.status(201).json(cart);
};

// DELETE /api/cart/:productId
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );
  await cart.save();

  res.json({ message: "Item removed" });
};
