const mongoose = require("mongoose");

// Define the schema structure for news articles
const newsSchema = new mongoose.Schema({
  source: Object,          // Source of the news (e.g., name, id)
  author: String,          // Author name
  title: { type: String, required: true }, // News title, required field
  description: String,     // Short description of the news article
  url: String,             // URL link to the full article
  urlToImage: String,      // URL to the news image
  publishedAt: Date,       // Publication date/time
  content: String,         // Main content of the news article
  country: String,         // Country associated with the news
  category: String,        // Category (e.g., sports, general)
  savedAt: { type: Date, default: Date.now }, // Date when the article was saved locally
});

module.exports = mongoose.model("News", newsSchema); // Export the News model
