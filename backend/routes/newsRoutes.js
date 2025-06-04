// backend/routes/newsRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllNews,
  getTopHeadlines,
  getCountryNews,
} = require("../controllers/newsController");

router.get("/all", getAllNews);
router.get("/top-headlines", getTopHeadlines);
router.get("/country/:iso", getCountryNews);

module.exports = router;
