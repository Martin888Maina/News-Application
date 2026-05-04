const axios = require('axios');

const client = axios.create({
  baseURL: process.env.NEWS_API_BASE_URL,
  timeout: 10000,
  headers: { 'X-Api-Key': process.env.NEWS_API_KEY },
});

exports.getEverything = (params) =>
  client.get('/everything', { params }).then((r) => r.data);

exports.getTopHeadlines = (params) =>
  client.get('/top-headlines', { params }).then((r) => r.data);

exports.getSources = (params) =>
  client.get('/sources', { params }).then((r) => r.data);
