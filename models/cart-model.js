const { Schema, model } = require('mongoose');

const cartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: false },
  quantity: { type: Number, required: false },
  size: { type: String, required: false },
});

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  items: [cartItemSchema],
});

module.exports = model('Cart', cartSchema);
