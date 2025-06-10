const User = require('../models/User'); // User model for database operations
const bcrypt = require('bcryptjs');     // For password hashing and comparison
const jwt = require('jsonwebtoken');    // For JWT token creation and verification

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate that all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user instance (password hashing should happen in model pre-save hook)
    const user = new User({ name, email, password });
    await user.save();

    // Generate JWT token with user ID and 1-day expiry
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Respond with created user info and token
    res.status(201).json({ user: { id: user._id, email: user.email }, token });
  } catch (err) {
    // Handle unexpected errors with 500 status
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// User login handler
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate that email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare provided password with hashed password stored in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate JWT token upon successful authentication
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Respond with user info and token
    res.status(200).json({ user: { id: user._id, email: user.email }, token });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Password reset handler
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Check if email and new password are provided
    if (!email || !newPassword) {
      return res.status(400).json({ message: 'Please provide both email and new password' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user's password (hashing expected in pre-save hook)
    user.password = newPassword;
    await user.save();

    // Respond with success message
    res.status(200).json({ message: 'Password successfully reset.' });
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Export auth controller functions
module.exports = {
  registerUser,
  loginUser,
  resetPassword,
};
