const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define schema for user accounts
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,   // Name is mandatory
    trim: true        // Trim whitespace
  },
  email: {
    type: String,
    required: true,   // Email is mandatory
    unique: true,     // Email must be unique across users
    lowercase: true   // Convert email to lowercase for consistency
  },
  password: {
    type: String,
    required: true    // Password is mandatory
  }
}, {
  timestamps: true    // Automatically add createdAt and updatedAt timestamps
});

// Pre-save hook to automatically hash the password before saving
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified or is new
  if (!this.isModified('password')) return next();

  // Generate salt for hashing
  const salt = await bcrypt.genSalt(10);

  // Hash the password using the generated salt
  this.password = await bcrypt.hash(this.password, salt);

  next(); // Proceed to save the user
});

module.exports = mongoose.model('User', userSchema); // Export the User model
