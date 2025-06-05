
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

router.put('/:id/status', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add these after your existing routes

// Monthly sales data
router.get('/sales-data', async (req, res) => {
  try {
    const salesData = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalSales: { $sum: "$total" },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.status(200).json({
      months: salesData.map(item => item._id),
      sales: salesData.map(item => item.totalSales),
      orders: salesData.map(item => item.orderCount)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Category sales data
router.get('/category-data', async (req, res) => {
  try {
    // This requires your products to have categories
    const categoryData = await Order.aggregate([
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" },
      {
        $group: {
          _id: "$product.category",
          totalSales: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
        }
      }
    ]);

    res.status(200).json({
      categories: categoryData.map(item => item._id),
      sales: categoryData.map(item => item.totalSales)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Time-based order data
router.get('/time-data', async (req, res) => {
  try {
    const timeData = await Order.aggregate([
      {
        $group: {
          _id: { $hour: "$createdAt" },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.status(200).json({
      times: timeData.map(item => `${item._id}:00`),
      orders: timeData.map(item => item.orderCount)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;