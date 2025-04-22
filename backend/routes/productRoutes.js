const express = require("express");
const router = express.Router();
const Product = require("../models/product"); 

router.post("/add", async (req, res) => {
  try {
    console.log("Received product data:", req.body); // Add this line
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error saving product:", error); // More detailed error
    res.status(500).json({ 
      message: "Failed to add product",
      error: error.message 
    });
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


// Update product 
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update product" });
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

router.put('/:id/stock', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.quantity += parseInt(req.body.quantity);
    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});

// In your product routes file
router.get("/category/:category", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get products by category" });
  }
});


module.exports = router;
