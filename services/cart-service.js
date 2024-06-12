const ApiError = require('../exceptions/api-error');
const CartModel = require('../models/cart-model');
const mongoose = require('mongoose');
const calculateCartTotal = require('../utils/calculate-cart-total');
class CartService {
  async addToCart(payload) {
    const { userId, productId, quantity, size, tempCartId } = payload;

    let cart;

    if (userId) {
      cart = await CartModel.findOne({ userId });
    } else if (tempCartId) {
      cart = await CartModel.findById(tempCartId);
    }

    if (!cart) {
      cart = new CartModel({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex((item) => item.productId === productId && item.size === size);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, size });
    }

    await cart.save();

    return cart;
  }

  async removeFromCart(payload) {
    const { userId, tempCartId, productId } = payload;

    let cart;

    if (userId) {
      cart = await CartModel.findOne({ userId });
    } else if (tempCartId) {
      cart = await CartModel.findById(tempCartId);
    }

    if (cart) {
      cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
      await cart.save();
    }

    return cart;
  }

  async getCart(payload) {
    const { userId, tempCartId } = payload;

    let matchCondition;
    if (userId) {
      matchCondition = { userId: mongoose.Types.ObjectId.createFromHexString(userId) };
    } else if (tempCartId) {
      matchCondition = { _id: mongoose.Types.ObjectId.createFromHexString(tempCartId) };
    } else {
      throw new Error('Neither userId nor tempCartId is provided');
    }

    const cart = await CartModel.aggregate([
      { $match: matchCondition },
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.productId',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: '$product' },
      {
        $project: {
          _id: 1,
          userId: 1,
          'items.productId': '$product._id',
          'items.title': '$product.title',
          'items.vendorCode': '$product.vendorCode',
          'items.price': '$product.price',
          'items.discountedPrice': '$product.discountedPrice',
          'items.thumbs': { $arrayElemAt: ['$product.thumbs', 0] },
          'items.quantity': '$items.quantity',
          'items.size': '$items.size',
        },
      },
      {
        $group: {
          _id: '$_id',
          userId: { $first: '$userId' },
          items: { $push: '$items' },
        },
      },
    ]);

    if (cart.length > 0) {
      const cartWithTotal = cart[0];
      const cartTotal = await calculateCartTotal(cartWithTotal);
      cartWithTotal.totalItems = cartTotal.totalItems;
      cartWithTotal.totalPrice = cartTotal.totalPrice;
      return cartWithTotal;
    } else {
      return { _id: null, userId: userId || tempCartId, items: [], totalItems: 0, totalPrice: 0 };
    }
  }

  async createTempCart() {
    const tempCart = new CartModel({ items: [] });
    await tempCart.save();
    return tempCart;
  }

  async mergeCarts(tempCartId, userId) {
    const tempCart = await CartModel.findById(tempCartId);
    let userCart = await CartModel.findOne({ userId });

    if (!tempCart) {
      throw new Error('Temporary cart not found');
    }

    if (!userCart) {
      tempCart.userId = userId;
      await tempCart.save();
      return tempCart;
    }

    for (let tempItem of tempCart.items) {
      const existingItemIndex = userCart.items.findIndex(
        (item) => item.productId.toString() === tempItem.productId.toString() && item.size === tempItem.size,
      );

      if (existingItemIndex > -1) {
        userCart.items[existingItemIndex].quantity += tempItem.quantity;
      } else {
        userCart.items.push(tempItem);
      }
    }

    await userCart.save();
    await CartModel.findByIdAndDelete(tempCartId);

    return userCart;
  }
}

module.exports = new CartService();
