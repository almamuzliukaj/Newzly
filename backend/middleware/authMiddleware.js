const jwt = require('jsonwebtoken'); // Importing jsonwebtoken package for JWT handling

// Middleware to verify if the request contains a valid JWT token for authentication
const authMiddleware = (req, res, next) => {
  // Extract the token from Authorization header, removing 'Bearer ' prefix if present
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token found, deny access
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  try {
    // Verify the token using the secret key and extract user info
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user info to the request object for downstream handlers
    req.user = verified;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails, return error response
    return res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = authMiddleware; // Export the middleware function
