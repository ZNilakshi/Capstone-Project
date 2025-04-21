const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  brand: String,
  size: String,
  abv: String,
  category: String,
  quantity: Number,
  photo: String, // store URL or base64 string
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
