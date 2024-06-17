function calculateCartTotal(cart) {
  let totalItems = 0;
  let totalPrice = 0;
  let totalDiscount = 0;

  for (const item of cart.items) {
    const price = item.discountedPrice || item.price;
    totalItems += item.quantity;
    totalPrice += item.quantity * price;
    if (item.discountedPrice) {
      totalDiscount += (item.price - item.discountedPrice) * item.quantity;
    }
  }

  return { totalItems, totalPrice, totalDiscount };
}

module.exports = calculateCartTotal;
