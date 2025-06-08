const axios = require("axios");
const News = require("../models/News");

const getAllNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 6;

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

    const totalCount = response.data.totalResults;

    res.status(200).json({
      success: true,
      fromCache: false,
      data: {
        totalResults: totalCount,
        articles,
      },
    });
  } catch (error) {
    console.error("❌ Error fetching all news:", error.message);

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 6;
    const totalCount = await News.countDocuments();
    const cachedNews = await News.find()
      .sort({ savedAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

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

const getTopHeadlines = async (req, res) => {
  try {
    const category = req.query.category || "general";
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 6;

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

    const category = req.query.category || "general";
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 6;
    const totalCount = await News.countDocuments({ category });
    const cachedNews = await News.find({ category })
      .sort({ savedAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

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

const getCountryNews = async (req, res) => {
  try {
    const country = req.params.iso.toLowerCase();
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 6;

    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        country,
        page,
        pageSize,
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    const articles = response.data.articles || [];

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
  } catch (error) {
    console.error("❌ Error fetching country news:", error.message);

    const country = req.params.iso.toLowerCase();
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 6;
    const totalCount = await News.countDocuments({ country });
    const cachedNews = await News.find({ country })
      .sort({ savedAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

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

module.exports = {
  getAllNews,
  getTopHeadlines,
  getCountryNews,
};
