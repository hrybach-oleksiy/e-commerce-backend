const express = require('express');
const productController = require('../controllers/product-controller');

const productRouter = express.Router();

productRouter.route('/').post(productController.getProducts);
productRouter.route('/').get(productController.getProduct);
productRouter.route('/best-selling').get(productController.getBestSellingProducts);
productRouter.route('/short').get(productController.getShortInfo);
productRouter.route('/thumb').post(productController.addThumbnail);
productRouter.route('/gallery').post(productController.addImgToGallery);
productRouter.route('/filters').post(productController.getFiltersData);

module.exports = productRouter;
