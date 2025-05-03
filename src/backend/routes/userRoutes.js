// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, forgotPassword } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);

// Protected example route
router.get('/profile', authMiddleware, (req, res) => {
  res.status(200).json({ message: `Welcome user ${req.user.id}` });
});

module.exports = router;
