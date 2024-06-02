const express = require('express');
const productController = require('../controllers/product-controller');

const productRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operations related to products
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get product.
 *     tags: [Products]
 *     description: Get product by vendor code.
 *     parameters:
 *       - in: query
 *         name: vc
 *         schema:
 *           type: number
 *         required: true
 *         description: The vendor code of the product.
 *         example: 671296
 *     responses:
 *       200:
 *         description: Successful retrieval of the product.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Fetch products
 *     tags: [Products]
 *     description: Get products by filters
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: category of products (bikes or accessories)
 *                 example: bikes
 *               minPrice:
 *                 type: number
 *                 description: Minimum price value of range ($)
 *                 example: 100
 *               maxPrice:
 *                 type: number
 *                 description: Maximum price value of range ($)
 *                 example: 2000
 *               weight:
 *                 type: number
 *                 description: Maximum rider weight (100 - 130 kg (step 15))
 *                 example: 115
 *               minBase:
 *                 type: number
 *                 description: Minimum bike wheel base of range (mm)
 *                 example: 1000
 *               maxBase:
 *                 type: number
 *                 description: Maximum bike wheel base of range (mm)
 *                 example: 1100
 *               frameSize:
 *                 type: number
 *                 description: Frame bike size (mm)
 *                 example: 450
 *     responses:
 *       200:
 *         description: Successful retrieval of the list of the products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 title:
 *                   type: string
 *                   description: Product title
 *                   example: City Step-Through 26" 3-Speed Yellow
 *                 price:
 *                   type: number
 *                   description: Product title
 *                   example: 699.99
 *                 rating:
 *                   type: number
 *                   description: Product rating from 0 to 5 (step 0.5)
 *                   example: 4.5
 *                 vendorCode:
 *                   type: number
 *                   description: Product code
 *                   example: 671296
 *                 discountedRouter:
 *                   type: number
 *                   description: Discounted price ($)
 *                   example: 559.99
 *       400:
 *         description: Bad Request.
 *       5XX:
 *         description: Unexpected error
 *
 */

productRouter.route('/').post(productController.getProducts);
productRouter.route('/best-selling').get(productController.getBestSellingProducts);
productRouter.route('/').get(productController.getProduct);
productRouter.route('/short').get(productController.getShortInfo);
productRouter.route('/thumb').post(productController.addThumbnail);
productRouter.route('/gallery').post(productController.addImgToGallery);
productRouter.route('/filters').post(productController.getFiltersData);

module.exports = productRouter;
