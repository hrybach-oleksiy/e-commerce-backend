const ProductModel = require('../models/product-model');

class ProductService {
  async getProducts(payload) {
    const { filters, page, pageSize } = payload;

    let query = {};

    if (filters.colors && filters.colors.length > 0) {
      query.color = { $in: filters.colors };
    }
    if (filters.categories && filters.categories.length > 0) {
      query.category = { $in: filters.categories };
    }
    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      query.price = { $gte: filters.minPrice, $lte: filters.maxPrice };
    }
    if (filters.rating && filters.rating.length > 0) {
      query.rating = { $in: filters.rating };
    }
    if (filters.weight && filters.weight.length > 0) {
      query.weight = { $in: filters.weight };
    }

    const projection = {
      title: 1,
      price: 1,
      rating: 1,
      vendorCode: 1,
      discountedPrice: 1,
    };

    const total = await ProductModel.countDocuments(query);
    const products = await ProductModel.find(query, projection)
      // .sort({ [sorts[0].field]: sorts[0].order === 'ASC' ? 1 : -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return { total, products };
  }

  async getProduct(vendorCode) {
    const product = await ProductModel.findOne({ vendorCode: vendorCode });
    return product;
  }

  async getFilters() {
    const products = await ProductModel.find({});

    const categories = [...new Set(products.map((product) => product.category))];
    const colors = [...new Set(products.map((product) => product.color))];
    const minPrice = Math.min(...products.map((product) => product.price));
    const maxPrice = Math.max(...products.map((product) => product.price));
    const rating = [...new Set(products.map((product) => product.rating))];
    const weight = [...new Set(products.map((product) => product.weight))];
    console.log('test');
    return { categories, colors, weight, minPrice, maxPrice, rating };
  }
}

module.exports = new ProductService();
