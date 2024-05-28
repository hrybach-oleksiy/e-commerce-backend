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

    // const projection = {
    //   title: 1,
    //   price: 1,
    //   rating: 1,
    //   'vendor code': 1,
    //   'discounted price': 1,
    // };

    const products = await ProductModel.find(filterOptions);
    return products;
  }

  async getAllProductsData(req, res) {
    const filters = req.body;
    console.log(filters);

    const query = {};

    // Category Filter
    if (filters.categories && filters.categories.length > 0) {
      query.category = { $in: filters.categories };
    }

    // Price Filter
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      query.price = {};
      if (filters.minPrice !== undefined) {
        query.price.$gte = filters.minPrice;
      }
      if (filters.maxPrice !== undefined) {
        query.price.$lte = filters.maxPrice;
      }
    }

    // Color Filter
    if (filters.colors && filters.colors.length > 0) {
      query.color = { $in: filters.colors };
    }

    // Weight Filter
    if (filters.minWeight !== undefined || filters.maxWeight !== undefined) {
      query.weight = {};
      if (filters.minWeight !== undefined) {
        query.weight.$gte = filters.minWeight;
      }
      if (filters.maxWeight !== undefined) {
        query.weight.$lte = filters.maxWeight;
      }
    }

    // rating Filter
    if (filters.minRating !== undefined || filters.maxRating !== undefined) {
      query.rating = {};
      if (filters.minRating !== undefined) {
        query.rating.$gte = filters.minRating;
      }
      if (filters.maxRating !== undefined) {
        query.rating.$lte = filters.maxRating;
      }
    }

    // Wheel Base Filter
    if (filters.wheelBases && filters.wheelBases.length > 0) {
      query.$or = query.$or || [];
      filters.wheelBases.forEach((base) => {
        const sizes = ['Small (50 cm)', 'Medium (53 cm)', 'Large (56 cm)'];
        sizes.forEach((size) => {
          query.$or.push({ [`sizing.${size}.Wheel Base`]: base });
        });
      });
    }

    // Frame Size Filter
    if (filters.frameSizes && filters.frameSizes.length > 0) {
      query.$or = query.$or || [];
      filters.frameSizes.forEach((size) => {
        query.$or.push({ [`sizing.${size}`]: { $exists: true } });
      });
    }

    const products = await ProductModel.find(query);
    return products;
  }

  async getProductById(productId) {
    const product = await ProductModel.findById(productId);
    return product;
  }
}

module.exports = new ProductService();
