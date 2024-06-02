const ApiError = require('../exceptions/api-error');
const ProductModel = require('../models/product-model');

class ProductService {
  async getProducts(payload) {
    const { query: searchQuery, filters, sorts, page, pageSize } = payload;

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
    if (searchQuery && searchQuery.trim().length > 0) {
      query.title = { $regex: searchQuery, $options: 'i' };
    }

    const addFields = {
      actualPrice: {
        $cond: { if: { $ifNull: ['$discountedPrice', false] }, then: '$discountedPrice', else: '$price' },
      },
    };

    let sortOptions = {};
    if (sorts && sorts.length > 0) {
      sorts.forEach((sort) => {
        if (sort.field) {
          if (sort.field === 'price') {
            sortOptions = { actualPrice: sort.order === 'ASC' ? 1 : -1 };
          } else {
            sortOptions[sort.field] = sort.order === 'ASC' ? 1 : -1;
          }
        }
      });
    }

    const projection = {
      title: 1,
      price: 1,
      rating: 1,
      vendorCode: 1,
      discountedPrice: 1,
    };

    const pipeline = [
      { $match: query },
      { $addFields: addFields },
      { $addFields: addFields },
      ...(Object.keys(sortOptions).length > 0 ? [{ $sort: sortOptions }] : []),
      { $skip: (page - 1) * pageSize },
      { $limit: pageSize },
      { $project: projection },
    ];

    const total = await ProductModel.countDocuments(query);
    const products = await ProductModel.aggregate(pipeline);

    return { total, products };
  }

  async getBestSellingProducts() {
    const topProducts = await ProductModel.find({}).sort({ rating: -1 }).limit(12).exec();
    const shuffledProducts = topProducts.sort(() => 0.5 - Math.random());
    const selectedProducts = shuffledProducts.slice(0, 4);
    const products = selectedProducts.map((product) => ({
      _id: product._id,
      title: product.title,
      price: product.price,
      rating: product.rating,
      vendorCode: product.vendorCode,
      discountedPrice: product.discountedPrice,
    }));

    return { total: 4, products };
  }

  async getProduct(vendorCode) {
    const product = await ProductModel.findOne({ vendorCode: vendorCode });
    if (!product) throw ApiError.BadRequest(`Product with vendor code ${vendorCode} not found`);
    return product;
  }

  async getFiltersData() {
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
