const express = require('express');
const Order = require('../models/models.orders');
const router = express.Router();


router.post('/', async (req, res) => {
  const { tableId, items, totalAmount } = req.body;
  const newOrder = new Order({ tableId, items, totalAmount });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;