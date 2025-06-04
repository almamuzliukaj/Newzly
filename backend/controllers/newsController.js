const axios = require("axios");
const News = require("../models/News");

const getAllNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

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

    for (const article of articles) {
      await News.updateOne(
        { title: article.title },
        { ...article, savedAt: new Date() },
        { upsert: true }
      );
    }

    res.status(200).json({
      success: true,
      fromCache: false,
      data: {
        totalResults: response.data.totalResults,
        articles,
      },
    });
  } catch (error) {
    console.error("❌ Error fetching all news:", error.message);

    const cachedNews = await News.find()
      .sort({ savedAt: -1 })
      .limit(10);

    if (cachedNews.length > 0) {
      return res.status(200).json({
        success: true,
        fromCache: true,
        data: {
          totalResults: cachedNews.length,
          articles: cachedNews,
        },
      });
    }

    res.status(500).json({ message: "Failed to fetch all news" });
  }
};

const getTopHeadlines = async (req, res) => {
  try {
    const category = req.query.category || "general";
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

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

    for (const article of articles) {
      await News.updateOne(
        { title: article.title },
        { ...article, category, savedAt: new Date() },
        { upsert: true }
      );
    }

    res.status(200).json({
      success: true,
      fromCache: false,
      data: {
        totalResults: response.data.totalResults,
        articles,
      },
    });
  } catch (error) {
    console.error("❌ Error fetching top headlines:", error.message);

    const cachedNews = await News.find({ category: req.query.category || "general" })
      .sort({ savedAt: -1 })
      .limit(10);

    if (cachedNews.length > 0) {
      return res.status(200).json({
        success: true,
        fromCache: true,
        data: {
          totalResults: cachedNews.length,
          articles: cachedNews,
        },
      });
    }

    res.status(500).json({ message: "Failed to fetch top headlines" });
  }
};

const getCountryNews = async (req, res) => {
  try {
    const country = req.params.iso.toLowerCase();
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

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
      for (const article of articles) {
        await News.updateOne(
          { title: article.title },
          { ...article, country, savedAt: new Date() },
          { upsert: true }
        );
      }

      return res.status(200).json({
        success: true,
        fromCache: false,
        data: {
          totalResults: response.data.totalResults,
          articles,
        },
      });
    }

    // fallback from MongoDB if API has 0 results
    const cachedNews = await News.find({ country })
      .sort({ savedAt: -1 })
      .limit(pageSize)
      .skip((page - 1) * pageSize);

    if (cachedNews.length > 0) {
      return res.status(200).json({
        success: true,
        fromCache: true,
        data: {
          totalResults: cachedNews.length,
          articles: cachedNews,
        },
      });
    }

    return res.status(200).json({
      success: true,
      fromCache: true,
      data: {
        totalResults: 0,
        articles: [],
      },
    });
  } catch (error) {
    console.error("❌ Error fetching country news:", error.message);
    return res.status(500).json({ message: "Failed to fetch country news" });
  }
};

module.exports = {
  getAllNews,
  getTopHeadlines,
  getCountryNews,
};
