const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  source: Object,
  author: String,
  title: { type: String, required: true },
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
  content: String,
  country: String,
  category: String,
  savedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("News", newsSchema);
