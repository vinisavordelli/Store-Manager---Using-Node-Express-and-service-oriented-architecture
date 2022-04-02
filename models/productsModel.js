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

const updateProduct = async (name, quantity, id) => {
  const QUERY = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?';
  const [product] = await connection.execute(QUERY, [name, quantity, id]);
  return ({ id: product.insertId, name, quantity });
};

const removeProduct = async (id) => {
  const QUERY = 'DELETE FROM StoreManager.products WHERE id = ?;';
  await connection.execute(QUERY, [id]);
  return 'Product removed';
};

module.exports = {
  getAll,
  findById,
  createProduct,
  findByName,
  updateProduct,
  removeProduct,
};