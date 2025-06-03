// In your server routes (e.g., routes/orders.js)
const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Assuming you have an Order model

router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    
    res.status(201).json({
      message: 'Order created successfully',
      orderId: order._id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;