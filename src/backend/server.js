// server.js

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
const cors = require('cors');

// Use CORS middleware
app.use(cors());

// If you need to allow requests only from specific origins, you can configure it like this:
// app.use(cors({ origin: 'http://localhost:5173' }));

// Other middleware and routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
