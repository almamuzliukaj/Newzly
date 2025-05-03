// src/backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken'); // assuming you are using JWT for authentication

// Middleware function to check if the user is authenticated
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  try {
    // Verify token and extract user information
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach user data to request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = authMiddleware; // Export the middleware
