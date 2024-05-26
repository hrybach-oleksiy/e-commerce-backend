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

    if (filter.category === 'bikes') {
      if (filter.weight) {
        filterOptions.weight = { $gte: filter.weight };
      }
      let wheelBaseFilter = {};
      if (filter.minBase && filter.maxBase) {
        wheelBaseFilter = {
          $or: [
            { 'sizing.Small (43cm).Wheel Base H': { $gte: filter.minBase, $lte: filter.maxBase } },
            { 'sizing.Medium (45cm).Wheel Base H': { $gte: filter.minBase, $lte: filter.maxBase } },
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
            { 'sizing.Small (43cm).Seat Tube (C-T) A': filter.frameSize },
            { 'sizing.Medium (45cm).Seat Tube (C-T) A': filter.frameSize },
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

  async getProduct(vendorCode) {
    const product = await ProductModel.findOne({ 'vendor code': vendorCode });
    return product;
  }
}

module.exports = new ProductService();
