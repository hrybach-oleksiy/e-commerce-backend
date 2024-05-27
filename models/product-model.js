const { Schema, model } = require('mongoose');
const specsSchema = require('../schemas/specs-schema');
const sizeSchema = require('../schemas/size-schema');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         category:
 *           type: string
 *           description: The category of the product.
 *           example: "bikes"
 *           unique: true
 *         title:
 *           type: string
 *           description: The title of the product.
 *           example: "Mountain Bike"
 *           required: true
 *           unique: true
 *           trim: true
 *         description:
 *           type: string
 *           description: The description of the product.
 *           example: "A high-quality mountain bike suitable for all terrains."
 *           trim: true
 *         vendor code:
 *           type: number
 *           description: The vendor code of the product.
 *           example: 123456
 *           unique: true
 *         price:
 *           type: number
 *           format: decimal
 *           description: The price of the product.
 *           example: 999.99
 *           required: true.
 *         discounted price:
 *           type: number
 *           format: decimal
 *           description: The price of the product with discount.
 *           example: 599.99
 *           required: true
 *         color:
 *           type: string
 *           description: The color of the product.
 *           example: "Red"
 *         rating:
 *           type: number
 *           format: decimal
 *           description: The rating of the product (from 0 to 5 in increments of 0.5).
 *           example: 3.5
 *         overview:
 *           type: array
 *           items:
 *             type: string
 *           description: A brief overview of the product.
 *           example: ["Durable frame", "Hydraulic brakes"]
 *         specs:
 *           $ref: '#/components/schemas/Specs'
 *         weight:
 *           type: number
 *           description: The weight limit of the bike (100/115/130kg).
 *           example: 100
 *         notes:
 *           type: object
 *           properties:
 *             Specifications:
 *               type: string
 *               description: Additional specifications of the product.
 *               example: "This bike meets all safety standards."
 *         sizing:
 *           $ref: '#/components/schemas/Size'
 */

const productSchema = new Schema({
  category: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  'vendor code': {
    type: Number,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  'discounted price': Number,
  color: String,
  rating: Number,
  overview: [String],
  specs: specsSchema,
  weight: Number,
  notes: { Specifications: String },
  sizing: {
    'Small (50 cm)': sizeSchema,
    'Medium (53 cm)': sizeSchema,
    'Large (56 cm)': sizeSchema,
  },
});

module.exports = model('Product', productSchema);
