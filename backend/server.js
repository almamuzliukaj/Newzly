// ✅ FILE: backend/server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
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

// ✅ Mongoose model për lajme
const newsSchema = new mongoose.Schema({
  country: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
  content: String,
  source: {
    id: String,
    name: String,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

const News = mongoose.model('News', newsSchema);

// ✅ Endpoint për ALL news
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
      res.json({ success: true, data: { totalResults: data.totalResults, articles: data.articles } });
    } else {
      res.status(500).json({ success: false, message: 'Error from NewsAPI', data });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// ✅ Endpoint për Top Headlines sipas kategorisë
// ✅ Endpoint për Top Headlines sipas kategorisë dhe vendit (US default)
app.get('/top-headlines', async (req, res) => {
  const { category = "general", page = 1, pageSize = 6, country = "us" } = req.query;
  const NEWS_API_KEY = process.env.NEWS_API_KEY;

  const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;

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


// ✅ Endpoint për lajme vetëm për 10 vende të lejuara me ruajtje në MongoDB
const allowedCountries = ['us', 'gb', 'fr', 'de', 'it', 'br', 'ca', 'au', 'in', 'jp'];

app.get('/country/:iso', async (req, res) => {
  const { iso } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 6;
  const countryCode = iso.toLowerCase();

  if (!allowedCountries.includes(countryCode)) {
    return res.status(403).json({ success: false, message: 'News for this country is not available.' });
  }

  try {
    const cachedNews = await News.find({ country: countryCode })
                                 .sort({ publishedAt: -1 })
                                 .skip((page - 1) * pageSize)
                                 .limit(pageSize);

    if (cachedNews.length > 0) {
      return res.json({
        success: true,
        data: {
          totalResults: cachedNews.length,
          articles: cachedNews,
        }
      });
    }

    const NEWS_API_KEY = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'ok' && data.articles.length > 0) {
      const newsToSave = data.articles.map(article => ({
        ...article,
        country: countryCode,
      }));

      await News.insertMany(newsToSave, { ordered: false }).catch(() => {});

      return res.json({
        success: true,
        data: {
          totalResults: data.totalResults,
          articles: data.articles,
        }
      });
    } else {
      return res.status(404).json({ success: false, message: 'No articles found from API.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});