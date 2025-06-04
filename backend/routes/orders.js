
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

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

router.get('/user/:email', async (req, res) => {
  try {
    const orders = await Order.find({ 'user.email': req.params.email }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;