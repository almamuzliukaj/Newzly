// backend/server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// ✅ Endpoint për ALL news (nga many categories)
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

// ✅ Endpoint për Top Headlines sipas kategorisë
app.get('/top-headlines', async (req, res) => {
  const { category = "general", page = 1, pageSize = 6 } = req.query;
  const NEWS_API_KEY = process.env.NEWS_API_KEY;

  const url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;

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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
