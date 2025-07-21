import User from "../models/User.js";
import Product from "../models/Product.js";

// ✅ Get Wishlist
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");
    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
};

// ✅ Add to Wishlist
export const addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const productId = req.params.id;

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    res.json({ message: "Added to wishlist" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add to wishlist" });
  }
};

// ✅ Remove from Wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const productId = req.params.id;

    user.wishlist = user.wishlist.filter(
      (itemId) => itemId.toString() !== productId
    );
    await user.save();

    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove from wishlist" });
  }
};
