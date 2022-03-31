const connection = require('./connection');

const serialize = (saleData) => ({
  saleId: saleData.sale_id,
  date: saleData.date,
  productId: saleData.product_id,
  quantity: saleData.quantity,
});

const getAll = async () => {
  const query = 'SELECT * FROM sales_products ORDER BY sale_id ASC, product_id ASC;';
  const [sales] = await connection.execute(query);

  return sales.map(serialize);
};

module.exports = {
  getAll,
};