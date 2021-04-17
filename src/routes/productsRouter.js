const express = require('express');

const { productsController } = require('../controllers');
const {
  productCreate,
  productDelete,
  productRead,
  productUpdate,
  productReadById,
} = productsController;

const { productsMiddleware } = require('../middlewares');
const { validateIdFormat, validateProductNameAndQuantity } = productsMiddleware;

const Products = express.Router();

Products.get('/products', productRead);

Products.get('/products/:id', validateIdFormat, productReadById);

Products.delete('/products/:id', validateIdFormat, productDelete);

Products.use(validateProductNameAndQuantity);

Products.post('/products', productCreate);

Products.put('/products/:id', validateIdFormat, productUpdate);

module.exports = Products;
