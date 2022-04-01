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
        message: 'Sale not found',
      } };
  }

  return product;
};

const createSale = async (saleData) => {
  const sale = await salesModel.createSale(saleData);
  // Não é necessário tratar o erro aqui será feito na validação
  return sale;
};

module.exports = {
  getAll,
  findById,
  createSale,
};
