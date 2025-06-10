const axios = require("axios");        // HTTP client for API requests
const News = require("../models/News"); // News model for DB operations

// Handler to get all news articles with keyword "news"
const getAllNews = async (req, res) => {
  try {
    // Parse pagination parameters or set defaults
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 6;

    // Fetch news from external NewsAPI using query "news"
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: "news",
        sortBy: "publishedAt",
        language: "en",
        page,
        pageSize,
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    const articles = response.data.articles;

    // Upsert each article into the database with a saved timestamp
    for (const article of articles) {
      await News.updateOne(
        { title: article.title },
        { ...article, savedAt: new Date() },
        { upsert: true }
      );
    }

    const totalCount = response.data.totalResults;

    // Respond with fresh news data
    res.status(200).json({
      success: true,
      fromCache: false,
      data: {
        totalResults: totalCount,
        articles,
      },
    });
  } catch (error) {
    // Log error and fallback to cached news from DB
    console.error("❌ Error fetching all news:", error.message);

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 6;
    const totalCount = await News.countDocuments();
    const cachedNews = await News.find()
      .sort({ savedAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    // Respond with cached news data
    res.status(200).json({
      success: true,
      fromCache: true,
      data: {
        totalResults: totalCount,
        articles: cachedNews,
      },
    });
  }
};

// Handler to get top headlines by category (default category: general)
const getTopHeadlines = async (req, res) => {
  try {
    const category = req.query.category || "general";
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 6;

    // Fetch top headlines from NewsAPI with category filter
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        category,
        country: "us",
        page,
        pageSize,
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    const articles = response.data.articles;

    // Upsert articles with category info and timestamp
    for (const article of articles) {
      await News.updateOne(
        { title: article.title },
        { ...article, category, savedAt: new Date() },
        { upsert: true }
      );
    }

    // Respond with fresh data
    res.status(200).json({
      success: true,
      fromCache: false,
      data: {
        totalResults: response.data.totalResults,
        articles,
      },
    });
  } catch (error) {
    // Log error and fallback to cached data by category
    console.error("❌ Error fetching top headlines:", error.message);

    const category = req.query.category || "general";
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 6;
    const totalCount = await News.countDocuments({ category });
    const cachedNews = await News.find({ category })
      .sort({ savedAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    // Respond with cached headlines
    res.status(200).json({
      success: true,
      fromCache: true,
      data: {
        totalResults: totalCount,
        articles: cachedNews,
      },
    });
  }
};

// Handler to get news by country code (ISO)
const getCountryNews = async (req, res) => {
  const country = req.params.iso.toLowerCase();
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 6;

  try {
    // Try fetching top headlines for the country first
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        country,
        page,
        pageSize,
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    const articles = response.data.articles || [];

    if (articles.length > 0) {
      // Upsert each article with country info
      for (const article of articles) {
        await News.updateOne(
          { title: article.title },
          { ...article, country, savedAt: new Date() },
          { upsert: true }
        );
      }

      // Return fresh top headlines
      return res.status(200).json({
        success: true,
        fromCache: false,
        data: {
          totalResults: response.data.totalResults,
          articles,
        },
      });
    }

    // If no top headlines, fallback to "everything" endpoint with country name as keyword
    const fallback = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: country, // Just the country name, not "country news"
        sortBy: "publishedAt",
        language: "en",
        page,
        pageSize,
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    const fallbackArticles = fallback.data.articles || [];

    // Upsert fallback articles with country info
    for (const article of fallbackArticles) {
      await News.updateOne(
        { title: article.title },
        { ...article, country, savedAt: new Date() },
        { upsert: true }
      );
    }

    // Return fallback news data
    return res.status(200).json({
      success: true,
      fromCache: false,
      data: {
        totalResults: fallback.data.totalResults,
        articles: fallbackArticles,
      },
    });
  } catch (error) {
    // Log error and fallback to cached news by country
    console.error("❌ Error fetching country news:", error.message);

    const totalCount = await News.countDocuments({ country });
    const cachedNews = await News.find({ country })
      .sort({ savedAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    // Respond with cached country news
    return res.status(200).json({
      success: true,
      fromCache: true,
      data: {
        totalResults: totalCount,
        articles: cachedNews,
      },
    });
  }
};

// Export news controller functions
module.exports = {
  getAllNews,
  getTopHeadlines,
  getCountryNews,
};
