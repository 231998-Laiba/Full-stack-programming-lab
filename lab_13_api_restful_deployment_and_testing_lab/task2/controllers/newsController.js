const axios = require("axios");

exports.getNewsByCountry = async (req, res) => {
  const { country } = req.params;

  // Validate country code (must be 2 letters)
  if (!country || country.length !== 2) {
    return res.status(400).json({
      success: false,
      message: "Invalid country code. Please use a 2-letter code like 'us', 'pk', 'gb'."
    });
  }

  try {
    const apiKey = process.env.NEWS_API_KEY;

    // Call NewsAPI
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines`,
      {
        params: {
          country: country.toLowerCase(),
          pageSize: 10,
          apiKey: apiKey
        }
      }
    );

    const articles = response.data.articles;

    // Handle no results
    if (!articles || articles.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No news found for country code: '${country}'`
      });
    }

    // Format and return response
    const headlines = articles.slice(0, 10).map((article) => ({
      title: article.title,
      source: article.source.name,
      url: article.url,
      publishedAt: article.publishedAt
    }));

    res.json({
      success: true,
      country: country.toUpperCase(),
      totalResults: headlines.length,
      headlines: headlines
    });

  } catch (error) {
    // Handle API-level errors
    if (error.response) {
      return res.status(error.response.status).json({
        success: false,
        message: error.response.data.message || "NewsAPI error occurred."
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error. Could not fetch news."
    });
  }
};