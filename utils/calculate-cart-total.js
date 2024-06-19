const Big = require('big.js');

function calculateCartTotal(cart) {
  let totalItems = Big(0);
  let totalPrice = Big(0);
  let totalDiscount = Big(0);
  let totalPromoDiscount = Big(0);

  for (const item of cart.items) {
    const price = Big(item.discountedPrice || item.price);
    totalItems = totalItems.add(item.quantity);
    totalPrice = totalPrice.add(price.mul(item.quantity));
    if (item.discountedPrice) {
      totalDiscount = totalDiscount.add(Big(item.price).minus(item.discountedPrice).mul(item.quantity));
    }
    if (cart.promo && cart.promo.discountType === 'percentage') {
      const promoDiscount = Big(price).mul(cart.promo.discount);
      item.discountedPrice = Big(price).minus(promoDiscount);

      const promoDiscountAllItems = promoDiscount.mul(item.quantity);
      totalPrice = totalPrice.minus(promoDiscountAllItems);
      totalPromoDiscount = totalPromoDiscount.plus(promoDiscountAllItems);
    }
  }

  return {
    totalItems: format(totalItems),
    totalPrice: format(totalPrice),
    totalDiscount: format(totalDiscount),
    totalPromoDiscount: format(totalPromoDiscount),
  };
}

function format(num) {
  return Number(num.toFixed(2));
}

module.exports = calculateCartTotal;
