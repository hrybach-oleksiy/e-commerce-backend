async function calculateCartTotal(cart) {
  let totalItems = 0;
  let totalPrice = 0;

  for (const item of cart.items) {
    const quantity = item.quantity;
    const price = item.discountedPrice || item.price;

    totalItems += quantity;

    totalPrice += quantity * price;
  }

  return { totalItems, totalPrice };
}

module.exports = calculateCartTotal;
