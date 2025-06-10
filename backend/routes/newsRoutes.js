const express = require("express");
const router = express.Router();
const {
  getAllNews,
  getTopHeadlines,
  getCountryNews,
} = require("../controllers/newsController");

// Route to get all news articles
router.get("/all", getAllNews);

// Route to get top headlines
router.get("/top-headlines", getTopHeadlines);

// Route to get news filtered by country ISO code
router.get("/country/:iso", getCountryNews);

module.exports = router; // Export the router to be used in server.js
