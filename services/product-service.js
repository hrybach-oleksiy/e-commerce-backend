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
      filterOptions.weight = { $gte: filter.weight };
      filterOptions['Wheel Base H'] = { $gte: filter.minBase, $lte: filter.maxBase };
      const priceFilter = {
        $or: [
          { 'discounted price': { $gte: filter.minPrice, $lte: filter.maxPrice } },
          { 'discounted price': { $exists: false }, price: { $gte: filter.minPrice, $lte: filter.maxPrice } },
        ],
      };
      const seatTubeFilter = {
        $or: [
          { 'sizing.Small (43cm).Seat Tube (C-T) A': filter.frameSize },
          { 'sizing.Medium (45cm).Seat Tube (C-T) A': filter.frameSize },
        ],
      };
      filterOptions['$and'] = [priceFilter, seatTubeFilter];
    }

    const products = await ProductModel.find(filterOptions);
    return products;
  }

  async getProduct(vendorCode) {
    const product = await ProductModel.findOne({ 'vendor code': vendorCode });
    return product;
  }
}

module.exports = new ProductService();
