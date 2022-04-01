const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();

  res.status(200).json(products);
};

const findById = async (req, res, next) => {
  const { id } = req.params;

  const product = await productsService.findById(id);

  if (product.error) {
    return next(product.error);
  }

  res.status(200).json(product);
};

const createProduct = async (req, res, next) => {
  const { name, quantity } = req.body;

  const product = await productsService.createProduct(name, quantity);

  if (product.error) {
    return next(product.error);
  }

  res.status(201).json(product);
};

module.exports = {
  getAll,
  findById,
  createProduct,
};