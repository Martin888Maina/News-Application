const newsApi = require('../services/newsApiService');

exports.searchEverything = async (req, res, next) => {
  try {
    const {
      q,
      from,
      to,
      sortBy,
      language,
      domains,
      excludeDomains,
      pageSize,
      page,
    } = req.query;

    if (!q && !domains) {
      return res
        .status(400)
        .json({ error: 'A search query (q) or domains is required.' });
    }

    const data = await newsApi.getEverything({
      q,
      from,
      to,
      sortBy: sortBy || 'publishedAt',
      language: language || 'en',
      domains,
      excludeDomains,
      pageSize: pageSize || 20,
      page: page || 1,
    });

    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.fetchTopHeadlines = async (req, res, next) => {
  try {
    const { country, category, sources, q, pageSize, page } = req.query;
    const data = await newsApi.getTopHeadlines({
      country: country || 'us',
      category,
      sources,
      q,
      pageSize: pageSize || 20,
      page: page || 1,
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.fetchSources = async (req, res, next) => {
  try {
    const { category, language, country } = req.query;
    const data = await newsApi.getSources({ category, language, country });
    res.json(data);
  } catch (err) {
    next(err);
  }
};
