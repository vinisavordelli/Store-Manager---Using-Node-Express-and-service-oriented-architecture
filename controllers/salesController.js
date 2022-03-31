const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();

  res.status(200).json(sales);
};

const findById = async (req, res, next) => {
  const { id } = req.params;

  const sales = await salesService.findById(id);

  if (sales.error) {
    return next(sales.error);
  }

  res.status(200).json(sales);
};

module.exports = {
  getAll,
  findById,
};
