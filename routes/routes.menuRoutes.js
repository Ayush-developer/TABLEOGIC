const express = require('express');
const Menu = require('../models/models.menuSchema');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', async (req, res) => {
  const { name, description, price, image } = req.body;
  const newMenuItem = new Menu({ name, description, price, image });

  try {
    const savedItem = await newMenuItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;