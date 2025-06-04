const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// POST endpoint
router.post('/send-order-notification', async (req, res) => {
  console.log('Received notification request'); // Debug log
  
  try {
    const { orderId, customerName, customerEmail, totalAmount } = req.body;
    
    // Validate required fields
    if (!orderId || !customerName || !customerEmail || !totalAmount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const mailOptions = {
      from: `"Store Notifications" <${process.env.EMAIL_USER}>`,
      to: 'nilakshisamarasekara0@gmail.com',
      subject: `New Order #${orderId}`,
      html: `
        <h2>New Order Notification</h2>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Customer:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Total:</strong> LKR ${totalAmount.toFixed(2)}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Notification sent' });
    
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ 
      error: 'Failed to send notification',
      details: error.message 
    });
  }
});

module.exports = router;