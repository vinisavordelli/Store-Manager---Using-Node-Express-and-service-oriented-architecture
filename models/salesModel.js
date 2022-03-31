const connection = require('./connection');

const serialize = (saleData) => ({
  saleId: saleData.sale_id,
  date: saleData.date,
  productId: saleData.product_id,
  quantity: saleData.quantity,
});

const getAll = async () => {
  const QUERY = `
  SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id
  ORDER BY sp.sale_id ASC;
  `;
  const [sales] = await connection.execute(QUERY);

  const serialized = sales.map((sale) => serialize(sale));
  return serialized;
};
const findById = async (id) => {
  const QUERY = `
  SELECT s.date, sp.product_id, sp.quantity
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id
  WHERE sp.sale_id = ?
  ORDER BY sp.sale_id ASC;
  `;

  const [sales] = await connection.execute(QUERY, [id]);

  if (sales.length === 0) {
    return null;
  }

  const serialized = sales.map((sale) => serialize(sale));
  return serialized;
};

module.exports = {
  getAll,
  findById,
};