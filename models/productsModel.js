const connection = require('./connection');

const getAll = async () => {
  const QUERY = 'SELECT * FROM StoreManager.products ORDER BY id ASC;';

  const [products] = await connection.execute(QUERY);

  return products;
};

const findByName = async (name) => {
  const QUERY = 'SELECT * FROM StoreManager.products WHERE name = ? ORDER BY id ASC;';

  const [product] = await connection.execute(QUERY, [name]);

  if (product.length === 0) {
    return null;
  }

  return product[0];
};

const findById = async (id) => {
  const QUERY = 'SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id ASC;';

  const [product] = await connection.execute(QUERY, [id]);

  if (product.length === 0) {
    return null;
  }

  return product[0];
};

const createProduct = async (name, quantity) => {
  const QUERY = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);';

  const [{ insertId }] = await connection.execute(QUERY, [name, quantity]);

  return { id: insertId, name, quantity };
};

module.exports = {
  getAll,
  findById,
  createProduct,
  findByName,
};