module.exports = (err, req, res, next) => {
  console.error('Error:', err.message);

  if (err.response) {
    return res.status(err.response.status).json({
      error: err.response.data.message || 'External API error',
      code: err.response.data.code,
    });
  }

  const message =
    process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.stack;
  res.status(500).json({ error: message });
};
