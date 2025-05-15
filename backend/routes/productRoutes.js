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


  router.get("/brand/:brand", async (req, res) => {
    try {
      const brandName = new RegExp(`^${req.params.brand}$`, 'i');
      const products = await Product.find({ brand: brandName });
      res.status(200).json(products);
    } catch (error) {
      console.error("Error getting products by brand:", error);
      res.status(500).json({ message: "Failed to get products by brand" });
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

// product routes file
router.get("/category/:category", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get products by category" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query || query.trim() === "") {
      return res.status(400).json({ 
        message: "Search query is required",
        suggestions: []
      });
    }

    // Search in name, brand, category, and description
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } }
      ],
    }).limit(50); // Limit results to prevent overload

    if (products.length === 0) {
      // If no results, find similar terms
      const similarProducts = await Product.find({
        $or: [
          { name: { $regex: query.split(" ")[0], $options: "i" } },
          { brand: { $regex: query.split(" ")[0], $options: "i" } }
        ]
      }).limit(5);
      
      return res.status(200).json({
        message: "No exact matches found",
        products: similarProducts,
        suggestions: [
          "Try different keywords",
          "Check your spelling",
          "Search for a more general term"
        ]
      });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ 
      message: "Failed to perform search",
      error: error.message 
    });
  }
});
module.exports = router;
