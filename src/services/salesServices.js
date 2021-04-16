const { salesModel } = require('../models');
const { create, read, readById, update, exclude } = salesModel;

const createSale = async (productList) => {
  productList.forEach((product) => {
    if (product.productId.length !== 24) throw new Error('Wrong product ID or invalid quantity');
    if (product.quantity <= 0 || typeof product.quantity !== 'number')
      throw new Error('Wrong product ID or invalid quantity');
  });

  const newSale = await create(productList);
  if (!newSale) return undefined;
  return { _id: newSale.insertedId, itensSold: productList };
};

const readSales = async () => {
  const data = await read();
  if (!data) return undefined;
  return data;
};

const readSalesById = async (id) => {
  if (id.length !== 24) throw new Error('Sale not found');
  const Sale = await readById(id);
  if (!Sale) throw new Error('Sale not found');
  return Sale;
};

const updateSaleById = async (id, body) => {
  const { productId, quantity } = body[0];
  if (id.length !== 24) throw new Error('Wrong product ID or invalid quantity');
  if (quantity <= 0 || typeof quantity !== 'number')
    throw new Error('Wrong product ID or invalid quantity');

  const newSale = await update(id, productId, quantity);
  if (!newSale) return undefined;
  return { _id: newSale.insertedId, itensSold: body };
};

const deleteSaleById = async (id) => {
  if (id.length !== 24) throw new Error('Wrong sale ID format');
  const readSale = await readSalesById(id);
  const SaleDeleted = await exclude(id);
  if (!SaleDeleted) throw new Error('saleDeleted did not work');
  return readSale;
};

module.exports = {
  createSale,
  readSales,
  readSalesById,
  updateSaleById,
  deleteSaleById,
};