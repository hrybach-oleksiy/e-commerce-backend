const express = require('express');
const productController = require('../controllers/product-controller');

const productRouter = express.Router();

productRouter.route('/').post(productController.getProducts);
productRouter.route('/').get(productController.getProduct);
productRouter.route('/best-selling').get(productController.getBestSellingProducts);
productRouter.route('/filters').get(productController.getFiltersData);
productRouter.route('/short').get(productController.getShortInfo);
productRouter.route('/thumb').post(productController.addThumbnail);
productRouter.route('/gallery').post(productController.addImgToGallery);
productRouter.route('/title').patch(productController.setTitle);
productRouter.route('/description').patch(productController.setDescription);
productRouter.route('/short-description').patch(productController.setShortDescription);
productRouter.route('/color').patch(productController.setColor);
productRouter.route('/rating').patch(productController.setRating);
productRouter.route('/category').patch(productController.setCategory);
productRouter.route('/overview').patch(productController.setOverview);
productRouter.route('/price').patch(productController.setPrice);
productRouter.route('/create').post(productController.createProduct);
productRouter.route('/:id/thumb/:index').delete(productController.deleteThumbnail);
productRouter.route('/:id/gallery/:index').delete(productController.deleteImage);

module.exports = productRouter;
