module.exports = (err, _req, res, _next) => {
  console.error(err.stack);
  if (err.code === 'Not Found') {
    return res.status(404).json({ message: err.message });
  }
  if (err.code === 'conflict') {
    return res.status(409).json({ message: err.message });
  }
};