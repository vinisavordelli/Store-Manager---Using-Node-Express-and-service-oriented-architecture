const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id ASC;';

  const [products] = await connection.execute(query);

  return products;
};

const findById = async (id) => {
  const QUERY = 'SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id ASC;';
  const [product] = await connection.execute(QUERY, [id]);

  if (product.length === 0) {
    return null;
  }

  return product[0];
};

module.exports = {
  getAll,
  findById,
};