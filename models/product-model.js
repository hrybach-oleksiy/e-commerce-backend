const { Schema, model } = require('mongoose');
const specsSchema = require('../schemas/specs-schema');
const sizeSchema = require('../schemas/size-schema');

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
  shortDescription: {
    type: String,
    trim: true,
  },
  vendorCode: {
    type: Number,
    unique: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: Number,
  color: String,
  rating: Number,
  overview: [String],
  specs: specsSchema,
  weight: Number,
  notes: { specifications: String },
  sizing: sizeSchema,
  thumbs: [String],
  gallery: [String],
});

module.exports = model('Product', productSchema);
