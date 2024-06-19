const { Schema, model } = require('mongoose');

const promoSchema = new Schema({
  code: { type: String, required: true },
  discount: { type: Number, required: true },
  // e.g. "percentage" or "fixed_amount"
  discountType: { type: String, required: true },
});

module.exports = {
  promoSchema,
  Promo: model('Promo', promoSchema),
};
