const { productsService } = require('../services');
const {
  createProduct,
  readProducts,
  readProductsById,
  updateProductById,
  deleteProductById,
} = productsService;

const SUCESS = 200;
const CREATE = 201;
const UNPROCESSABLE = 422;
const CODE_INVALID = 'invalid_data';

const productCreate = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const result = await createProduct(name, quantity);
    res.status(CREATE).json(result);
  } catch (error) {
    console.error(error);
    next({
      status: UNPROCESSABLE,
      message: error.message,
      code: CODE_INVALID,
    });
  }
};

const productRead = async (_req, res, next) => {
  try {
    const result = await readProducts();
    res.status(SUCESS).json({
      products: result,
    });
  } catch (error) {
    console.error(error);
    next({
      status: UNPROCESSABLE,
      message: error.message,
      code: CODE_INVALID,
    });
  }
};

const productReadById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await readProductsById(id);
    res.status(SUCESS).json(result);
  } catch (error) {
    console.error(error);
    next({
      status: UNPROCESSABLE,
      message: error.message,
      code: CODE_INVALID,
    });
  }
};

const productUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const result = await updateProductById(id, name, quantity);
    res.status(SUCESS).json(result);
  } catch (error) {
    console.error(error);
    next({
      status: UNPROCESSABLE,
      message: error.message,
      code: CODE_INVALID,
    });
  }
};

const productDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteProductById(id);
    res.status(SUCESS).json(result);
  } catch (error) {
    console.error(error);
    next({
      status: UNPROCESSABLE,
      message: error.message,
      code: CODE_INVALID,
    });
  }
};

module.exports = {
  productCreate,
  productRead,
  productReadById,
  productUpdate,
  productDelete,
};
