// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Route për lajmet me pagination
app.get('/all-news', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 6;

  const NEWS_API_KEY = process.env.NEWS_API_KEY;
  const query = 'world';

  const url = `https://newsapi.org/v2/everything?q=${query}&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'ok') {
      res.json({
        success: true,
        data: {
          totalResults: data.totalResults,
          articles: data.articles,
        }
      });
    } else {
      res.status(500).json({ success: false, message: 'Error from NewsAPI', data });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
