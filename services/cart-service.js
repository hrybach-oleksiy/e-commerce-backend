const ApiError = require('../exceptions/api-error');
const CartModel = require('../models/cart-model');
class CartService {
  async addToCart(payload) {
    const { userId, productId, quantity, size } = payload;
    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      cart = new CartModel({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId && item.size === size);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, size });
    }

    await cart.save();

    return cart;
  }

  async removeFromCart(payload) {
    const { userId, productId } = payload;
    let cart = await CartModel.findOne({ userId });

    if (cart) {
      cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
      await cart.save();
    }

    return cart;
  }

  async getCart(payload) {
    const { userId } = payload;
    const cart = await CartModel.findOne({ userId }).populate('items.productId');

    return cart;
  }
}

module.exports = new CartService();
