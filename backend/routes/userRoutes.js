const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  resetPassword
} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes - no authentication required
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/reset-password', resetPassword); // Password reset route

// Protected route - requires valid JWT token
router.get('/profile', authMiddleware, (req, res) => {
  // If authMiddleware passes, respond with a welcome message including user ID
  res.status(200).json({ message: `Welcome user ${req.user.id}` });
});

module.exports = router;
