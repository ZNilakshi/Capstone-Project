const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const Product = require("../models/product");
const auth = require("../middleware/auth");

// Middleware to get or create cart for user
const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user.userId }).populate('items.product');
    
    if (!cart) {
      cart = new Cart({ user: req.user.userId, items: [] });
      await cart.save();
    }
    
    req.cart = cart;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get cart
router.get("/", auth, getCart, async (req, res) => {
  try {
    res.json(req.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add item to cart
router.post("/add", auth, getCart, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    // Check if product is already in cart
    const existingItem = req.cart.items.find(item => 
      item.product._id.toString() === productId
    );
    
    if (existingItem) {
      // Update quantity if already in cart
      existingItem.quantity += quantity || 1;
    } else {
      // Add new item to cart
      req.cart.items.push({ product: productId, quantity: quantity || 1 });
    }
    
    await req.cart.save();
    res.json(req.cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update item quantity
router.put("/update/:productId", auth, getCart, async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }
    
    const item = req.cart.items.find(item => 
      item.product._id.toString() === productId
    );
    
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    
    item.quantity = quantity;
    await req.cart.save();
    res.json(req.cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Remove item from cart
router.delete("/remove/:productId", auth, getCart, async (req, res) => {
  try {
    const { productId } = req.params;
    
    req.cart.items = req.cart.items.filter(item => 
      item.product._id.toString() !== productId
    );
    
    await req.cart.save();
    res.json(req.cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Clear cart
router.delete("/clear", auth, getCart, async (req, res) => {
  try {
    req.cart.items = [];
    await req.cart.save();
    res.json(req.cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;