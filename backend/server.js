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

// ✅ Endpoint për ALL news (static 'world')
app.get('/all-news', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 6;
  const NEWS_API_KEY = process.env.NEWS_API_KEY;

  const url = `https://newsapi.org/v2/everything?q=world&page=${page}&pageSize=${pageSize}&language=en&apiKey=${NEWS_API_KEY}`;

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
dotenv.config();
app.use(cors());
app.use(express.json());

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

// ✅ Endpoint për Top Headlines sipas kategorisë dhe vendit (default: US)
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

// ✅ Endpoint për lajme sipas vendit duke përdorur `everything?q=`
const countryQueryMap = {
  us: "united states",
  gb: "united kingdom",
  fr: "france",
  de: "germany",
  it: "italy",
  br: "brazil",
  ca: "canada",
  au: "australia",
  in: "india",
  jp: "japan",
};

// ✅ ENDPOINT: /country/:iso me fallback në GNews nëse s'ka lajme nga NewsAPI
app.get('/country/:iso', async (req, res) => {
  const { iso } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 6;
  const countryCode = iso.toLowerCase();
  const query = countryQueryMap[countryCode];

  if (!query) {
    return res.status(403).json({ success: false, message: 'Country not supported.' });
  }

  // ✅ 1. Primary: NewsAPI me `everything`
  const newsUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&page=${page}&pageSize=${pageSize}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;

  try {
    const newsRes = await fetch(newsUrl);
    const newsData = await newsRes.json();

    if (newsData.status === 'ok' && newsData.articles.length > 0) {
      return res.json({
        success: true,
        data: {
          totalResults: newsData.totalResults,
          articles: newsData.articles,
        }
      });
    }

    // ✅ 2. Fallback: GNews API
    const gnewsUrl = `https://gnews.io/api/v4/top-headlines?token=${GNEWS_API_KEY}&lang=en&country=${countryCode}&max=${pageSize}&page=${page}`;
    const gnewsRes = await fetch(gnewsUrl);
    const gnewsData = await gnewsRes.json();

    if (gnewsData.articles && gnewsData.articles.length > 0) {
      return res.json({
        success: true,
        data: {
          totalResults: 100,
          articles: gnewsData.articles,
        }
      });
    }

    return res.status(404).json({ success: false, message: 'No articles found for this country.' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
