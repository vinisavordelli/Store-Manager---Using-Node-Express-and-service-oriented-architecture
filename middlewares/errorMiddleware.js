module.exports = (err, _req, res, next) => {
  console.error(err.stack);
  if (err.code === 'Not Found') {
    return res.status(404).json({ message: err.message });
  }
  if (err.code === 'conflict') {
    return res.status(409).json({ message: err.message });
  }
  if (err.isJoi) {
    const statusCode = err.details[0].type;
    const result = (statusCode === 'any.required') ? '400' : '422';

    return res.status(result).json({ message: err.message });
  }
  next();
};