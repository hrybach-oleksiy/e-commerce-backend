const ProductModel = require('../models/product-model');

class ProductService {
  async getProducts(filter) {
    let filterOptions = {};
    if (filter.category) {
      filterOptions.category = filter.category;
    }
    if (filter.color) {
      filterOptions.color = filter.color;
    }
    if (filter.rating) {
      filterOptions.rating = { $gte: filter.rating };
    }

    if (filter.category === 'bikes') {
      if (filter.weight) {
        filterOptions.weight = { $gte: filter.weight };
      }
      let wheelBaseFilter = {};
      if (filter.minBase && filter.maxBase) {
        wheelBaseFilter = {
          $or: [
            { 'sizing.Small (50 cm).Wheel Base': { $gte: filter.minBase, $lte: filter.maxBase } },
            { 'sizing.Medium (53 cm).Wheel Base': { $gte: filter.minBase, $lte: filter.maxBase } },
            { 'sizing.Large (56 cm).Wheel Base': { $gte: filter.minBase, $lte: filter.maxBase } },
          ],
        };
      }
      let priceFilter = {};
      if (filter.minPrice && filter.maxPrice) {
        priceFilter = {
          $or: [
            { 'discounted price': { $gte: filter.minPrice, $lte: filter.maxPrice } },
            { 'discounted price': { $exists: false }, price: { $gte: filter.minPrice, $lte: filter.maxPrice } },
          ],
        };
      }
      let frameSizeFilter = {};
      if (filter.frameSize) {
        frameSizeFilter = {
          $or: [
            { 'sizing.Small (50 cm).Seat Tube': filter.frameSize },
            { 'sizing.Medium (53 cm).Seat Tube': filter.frameSize },
            { 'sizing.Large (56 cm).Seat Tube': filter.frameSize },
          ],
        };
      }
      filterOptions['$and'] = [priceFilter, frameSizeFilter, wheelBaseFilter];
    }

    const projection = {
      title: 1,
      price: 1,
      rating: 1,
      'vendor code': 1,
      'discounted price': 1,
    };

    const products = await ProductModel.find(filterOptions, projection);
    return products;
  }

  async getAllProductsData() {
    const products = await ProductModel.find();
    return products;
  }

  async getProductById(productId) {
    const product = await ProductModel.findById(productId);
    return product;
  }
}

module.exports = new ProductService();
