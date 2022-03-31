module.exports = (err, _req, res, _next) => {
  if (err.code === 'notFound') {
    return res.status(404).json({ message: err.message });
  }
};