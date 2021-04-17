const express = require('express');

const { salesController } = require('../controllers');
const { saleCreate, saleRead, saleReadById, saleUpdate, saleDelete } = salesController;

const { salesMiddleware } = require('../middlewares');
const { checkProductsExistToSale } = salesMiddleware;

const Sales = express.Router();

Sales.post('/sales', checkProductsExistToSale, saleCreate);

Sales.get('/sales', saleRead);

Sales.get('/sales/:id', saleReadById);

Sales.put('/sales/:id', checkProductsExistToSale, saleUpdate);

Sales.delete('/sales/:id', saleDelete);

module.exports = Sales;
