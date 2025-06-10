const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const newsRoutes = require("./routes/newsRoutes");

dotenv.config(); // Load environment variables from .env file

connectDB(); // Connect to MongoDB database

const app = express();

app.use(cors()); // Enable Cross-Origin Resource Sharing for all origins
app.use(express.json()); // Parse JSON bodies from incoming requests

// Register user-related routes under /api/users
app.use("/api/users", userRoutes);

// Register news-related routes under /api/news
app.use("/api/news", newsRoutes);

const PORT = process.env.PORT || 5000; // Use PORT from env or default to 5000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
