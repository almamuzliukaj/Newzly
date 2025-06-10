// Import mongoose library for MongoDB interactions
const mongoose = require('mongoose');

// Async function to connect to MongoDB using connection string from environment variables
const connectDB = async () => {
  try {
    // Connect to MongoDB with new URL parser and unified topology options
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    // Log success message when connected
    console.log('✅ MongoDB connected');
  } catch (error) {
    // Log error and exit process on connection failure
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Export the connectDB function for use in other parts of the app
module.exports = connectDB;
