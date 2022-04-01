const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();

  return products;
};

const findById = async (id) => {
  const product = await productsModel.findById(id);

  if (!product) {
    return {
      error:
      { 
        code: 'Not Found',
        message: 'Product not found',
      } };
  }

  return product;
};

const createProduct = async (name, quantity) => {
  const filteredProduct = await productsModel.findByName(name);

  if (filteredProduct) {
    return { 
      error:
      { 
        code: 'conflict',
        message: 'Product already exists',
      } };
  }

  const product = await productsModel.createProduct(name, quantity);

  return product;
};

module.exports = {
  getAll,
  findById,
  createProduct,
};