const { ObjectID } = require('mongodb');
const { productsModel } = require('../models');
const { create, exclude, read, update, readById } = productsModel;

const createProduct = async (name, quantity) => {
  const productsList = await readProducts();

  if (!productsList) throw new Error('Products undefined');
  const checkNameExists = productsList.some((product) => product.name === name);
  if (checkNameExists) throw new Error('Product already exists');

  const newProduct = await create(name, quantity);
  if (!newProduct.result.ok) throw new Error('Error from model - create');
  return { _id: newProduct.insertedId, name, quantity };
};

const readProducts = async () => {
  const data = await read();
  if (!data) throw new Error('Error from model - readSales');
  return data;
};

const readProductsById = async (id) => {
  if (!ObjectID.isValid(id)) throw new Error('Wrong id format');
  const product = await readById(id);
  if (!product) throw new Error('Product not found');
  return product;
};

const updateProductById = async (id, name, quantity) => {
  const newProduct = await update(id, name, quantity);
  if (!newProduct.result.ok) throw new Error('Error from model - updateSaleById');
  return { _id: newProduct.insertedId, name, quantity };
};

const deleteProductById = async (id) => {
  if (!ObjectID.isValid(id)) throw new Error('Wrong id format');
  const readProduct = await readProductsById(id);
  const productDeleted = await exclude(id);
  if (!productDeleted.result.ok) throw new Error('Error from model - deleteSaleById');
  return readProduct;
};

module.exports = {
  createProduct,
  readProducts,
  readProductsById,
  updateProductById,
  deleteProductById,
};
