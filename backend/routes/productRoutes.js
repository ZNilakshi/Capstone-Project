const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); // Create this model

// Save a product
router.post("/add", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add product" });
  }
});
// Get all products
router.get("/", async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to get products" });
    }
  });
  // Update product quantity
router.put("/:id", async (req, res) => {
    try {
      const { quantity } = req.body;
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { quantity },
        { new: true }
      );
      res.status(200).json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update stock" });
    }
  });
  
module.exports = router;
