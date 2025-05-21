

// models/News.js
const mongoose = require("mongoose");

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

module.exports = mongoose.model("News", newsSchema);

