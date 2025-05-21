//controllers/newsController.js

const News = require("./models/News");

const allowedCountries = ['us', 'gb', 'fr', 'de', 'it', 'br', 'ca', 'au', 'in', 'jp'];

app.get('/country/:iso', async (req, res) => {
  const { iso } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 6;

  if (!allowedCountries.includes(iso.toLowerCase())) {
    return res.status(403).json({ success: false, message: 'News for this country is not available.' });
  }

  try {
    // Kontrollo nese kemi lajme te ruajtura ne MongoDB per kete vend
    const cachedNews = await News.find({ country: iso.toLowerCase() })
                                 .sort({ publishedAt: -1 })
                                 .limit(pageSize)
                                 .skip((page - 1) * pageSize);

    if (cachedNews.length > 0) {
      return res.json({
        success: true,
        data: {
          totalResults: cachedNews.length,
          articles: cachedNews,
        }
      });
    }

    // Nëse s’ka, kërko nga NewsAPI
    const NEWS_API_KEY = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?country=${iso}&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'ok' && data.articles.length > 0) {
      // Ruaj në MongoDB
      const newsToSave = data.articles.map(article => ({
        ...article,
        country: iso.toLowerCase(),
      }));

      await News.insertMany(newsToSave, { ordered: false }).catch(() => {}); // Ignore duplicates
      return res.json({ success: true, data: { totalResults: data.totalResults, articles: data.articles } });
    } else {
      return res.status(404).json({ success: false, message: 'No articles found from API.' });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
