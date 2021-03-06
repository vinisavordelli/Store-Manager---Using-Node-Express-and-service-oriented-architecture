const connection = require('./connection');

const serialize = (saleData) => ({
  saleId: saleData.sale_id,
  date: saleData.date,
  productId: saleData.product_id,
  quantity: saleData.quantity,
});

// Banco de dados não estava conseguindo acessar a coluna nos testes, nato ajudou com isso, mas causas são ainda desconhecidas.

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

const createSale = async (saleData) => {
  const SALE_QUERY = `
  INSERT INTO StoreManager.sales (date)
  VALUES (CURRENT_TIMESTAMP());
  `;

  const [sale] = await connection.execute(SALE_QUERY);

  const PRODUCTS_QUERY = `
  INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?, ?, ?);
`;

  saleData.forEach(async ({ productId, quantity }) => {
  await connection.execute(PRODUCTS_QUERY, [sale.insertId, productId, quantity]);
});

  return {
    id: sale.insertId,
    itemsSold: saleData,
  };
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

const updateSale = async (id, saleData) => {
  const [{ productId, quantity }] = saleData;

  const QUERY = `
  UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?;
  `;

  await connection.execute(QUERY, [quantity, id, productId]);
  return {
    saleId: id,
    itemUpdated: saleData,
  };
};

module.exports = {
  getAll,
  findById,
  createSale,
  updateSale,
};