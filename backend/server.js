// ✅ server.js (updated)
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

const COUNTRY_SOURCES = {
  de: 'tagesschau,die-zeit',
  fr: 'le-monde',
  us: 'cnn,the-washington-post',
  jp: 'nhk-news',
  gb: 'bbc-news,the-independent',
  ca: 'cbc-news',
  au: 'abc-news',
  in: 'the-hindu',
  br: 'globo',
};

app.get('/country/:iso', async (req, res) => {
  const iso = req.params.iso.toLowerCase();
  const sources = COUNTRY_SOURCES[iso];

  if (!sources) {
    return res.status(400).json({ success: false, message: 'Unsupported country code' });
  }

  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 6;

  const NEWS_API_KEY = process.env.NEWS_API_KEY;

  const url = `https://newsapi.org/v2/top-headlines?sources=${sources}&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;

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


// ✅ Country-specific News
app.get('/country-news', async (req, res) => {
  const { country, page = 1, pageSize = 6 } = req.query;
  const NEWS_API_KEY = process.env.NEWS_API_KEY;

  const sources = COUNTRY_SOURCES[country];
  if (!sources) {
    return res.status(400).json({
      success: false,
      message: `No sources defined for ${country}`,
    });
  }

  const url = `https://newsapi.org/v2/top-headlines?sources=${sources.join(',')}&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'ok') {
      res.json({
        success: true,
        data: {
          totalResults: data.totalResults,
          articles: data.articles,
        },
      });
    } else {
      res.status(500).json({ success: false, message: 'Error from NewsAPI', data });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Existing endpoints can stay
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
