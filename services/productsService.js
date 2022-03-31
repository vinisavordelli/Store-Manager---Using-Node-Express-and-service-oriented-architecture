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
        message: 'Sorry, Product Not Found',
      } };
  }

  return product;
};

module.exports = {
  getAll,
  findById,
};