const { productsService } = require('../services');
const { readProductsById } = productsService;

const UNPROCESSABLE = 422;
const CODE = 'invalid_data';

const checkProductsExistToSale = async (req, _res, next) => {
  try {
    const { body } = req;
    const arrayPromise = body.map((product) => readProductsById(product.productId));
    const productsList = await Promise.all(arrayPromise);

    productsList.forEach((product) => {
      if (!product) throw new Error('Product is not registered');
    });

    next();
  } catch (error) {
    console.error(error);
    next({
      status: UNPROCESSABLE,
      code: CODE,
      message: error.message,
    });
  }
};

module.exports = {
  checkProductsExistToSale,
};
