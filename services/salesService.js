const salesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await salesModel.getAll();

  return sales;
};

const findById = async (id) => {
  const product = await salesModel.findById(id);

  if (!product) {
    return {
      error:
      { 
        code: 'Not Found',
        message: 'Sorry, sale Not Found',
      } };
  }

  return product;
};

module.exports = {
  getAll,
  findById,
};
