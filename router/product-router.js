const express = require('express');
const productController = require('../controllers/product-controller');

const productRouter = express.Router();

productRouter.route('/').post(productController.getProducts);
productRouter.route('/product').get(productController.getProduct);

module.exports = productRouter;
