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

const createSale = async (req, res) => {
  const sale = await salesService.createSale(req.body);

  res.status(201).json(sale);
};

const updateSale = async (req, res, next) => {
  const { id } = req.params;

  const updatedSale = await salesService.updateSale(id, req.body);

  if (updatedSale.error) {
    return next(updatedSale.error);
  }

  return res.status(200).json(updatedSale);
};

module.exports = {
  getAll,
  findById,
  createSale,
  updateSale,
};
