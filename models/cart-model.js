const { Schema, model } = require('mongoose');

const cartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'products', required: true },
  quantity: { type: Number, required: true },
});

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  items: [cartItemSchema],
});

module.exports = model('Cart', cartSchema);
