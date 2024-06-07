const ApiError = require('../exceptions/api-error');
const CartModel = require('../models/cart-model');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

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

  // async getCart(payload) {
  //   const { userId } = payload;

  //   const cart = await CartModel.findOne({ userId }).populate({
  //     path: 'items.productId',
  //     select: 'title price discountedPrice vendorCode thumbs',
  //   });

  //   cart.items.forEach((item) => {
  //     if (item.productId.thumbs.length > 0) {
  //       item.productId.thumbs = item.productId.thumbs[0];
  //     }
  //   });

  //   return cart;
  // }

  async getCart(payload) {
    const { userId } = payload;

    const cart = await CartModel.aggregate([
      { $match: { userId: mongoose.Types.ObjectId.createFromHexString(userId) } },
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
          'items._id': '$product._id',
          'items.title': '$product.title',
          'items.vendorCode': '$product.vendorCode',
          'items.price': '$product.price',
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
      return cart[0];
    } else {
      return { _id: null, userId, items: [] };
    }
  }
}

module.exports = new CartService();
