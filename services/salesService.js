const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

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

const updateSale = async (id, saleData) => {
  const filteredSale = await salesModel.findById(id);
  const saleProducts = await productsModel.findById(saleData[0].productId);

  if (!filteredSale) {
    return { error: { code: 'Not Found', message: 'Sale not found' } };
  }

  if (!saleProducts) {
    return { error: { code: 'Not Found', message: 'Product not found' } };
  }

  const sale = await salesModel.updateSale(id, saleData);

  return sale;
};

module.exports = {
  getAll,
  findById,
  createSale,
  updateSale,
};
