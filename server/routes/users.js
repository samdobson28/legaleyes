const express = require('express');
const argon2 = require('argon2');
const User = require('../models/User');
const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const hashPassword = await argon2.hash(password);
    const user = new User({ name, username, password: hashPassword });
    await user.save();
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ message: 'User created successfully', userId: user._id });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Error registering new user', details: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', userId: user._id });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

module.exports = router;
