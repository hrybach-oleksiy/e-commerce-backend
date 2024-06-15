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
      thumbs: { $arrayElemAt: ['$thumbs', 0] },
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
    const products = await ProductModel.aggregate([
      { $match: { category: 'bikes' } },
      { $sort: { rating: -1 } },
      { $limit: 12 },
      { $sample: { size: 4 } },
      {
        $project: {
          _id: 1,
          title: 1,
          price: 1,
          rating: 1,
          vendorCode: 1,
          discountedPrice: 1,
          thumbs: { $arrayElemAt: ['$thumbs', 0] },
        },
      },
    ]).exec();

    return { total: 4, products };
  }

  async getProduct(vendorCode) {
    const product = await ProductModel.findOne({ vendorCode: vendorCode });
    if (!product) throw ApiError.BadRequest(`Product with vendor code ${vendorCode} not found`);
    return product;
  }

  // async getFiltersData() {
  //   const categoriesPromise = ProductModel.distinct('category');
  //   const colorsPromise = ProductModel.distinct('color');
  //   const ratingPromise = ProductModel.distinct('rating');
  //   const weightPromise = ProductModel.distinct('weight');

  //   const [categories, colors, rating, weight] = await Promise.all([
  //     categoriesPromise,
  //     colorsPromise,
  //     ratingPromise,
  //     weightPromise,
  //   ]);

  //   const [minMaxPrice] = await ProductModel.aggregate([
  //     {
  //       $group: {
  //         _id: null,
  //         minPrice: { $min: '$price' },
  //         maxPrice: { $max: '$price' },
  //       },
  //     },
  //   ]);

  //   return {
  //     categories,
  //     colors,
  //     weight: weight.filter((w) => w !== undefined),
  //     minPrice: minMaxPrice.minPrice,
  //     maxPrice: minMaxPrice.maxPrice,
  //     rating,
  //   };
  // }

  async getFiltersData() {
    const categoriesPromise = ProductModel.distinct('category');
    const colorsPromise = ProductModel.distinct('color');
    const ratingPromise = ProductModel.distinct('rating');
    const weightPromise = ProductModel.distinct('weight');

    const [categories, colors, rating, weight] = await Promise.all([
      categoriesPromise,
      colorsPromise,
      ratingPromise,
      weightPromise,
    ]);

    const [minMaxPrice] = await ProductModel.aggregate([
      {
        $group: {
          _id: null,
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
    ]);

    const [minMaxHeadTube] = await ProductModel.aggregate([
      {
        $group: {
          _id: null,
          minHeadTube: { $min: '$sizing.headTube.small' },
          maxHeadTube: { $max: '$sizing.headTube.large' },
        },
      },
    ]);

    const [minMaxWheelBase] = await ProductModel.aggregate([
      {
        $group: {
          _id: null,
          minWheelBase: { $min: '$sizing.wheelBase.small' },
          maxWheelBase: { $max: '$sizing.wheelBase.large' },
        },
      },
    ]);

    const [minMaxSeatTube] = await ProductModel.aggregate([
      {
        $group: {
          _id: null,
          minSeatTube: { $min: '$sizing.seatTube.small' },
          maxSeatTube: { $max: '$sizing.seatTube.large' },
        },
      },
    ]);

    return {
      categories,
      colors,
      weight: weight.filter((w) => w !== undefined),
      minPrice: minMaxPrice.minPrice,
      maxPrice: minMaxPrice.maxPrice,
      rating,
      minHeadTube: minMaxHeadTube.minHeadTube,
      maxHeadTube: minMaxHeadTube.maxHeadTube,
      minWheelBase: minMaxWheelBase.minWheelBase,
      maxWheelBase: minMaxWheelBase.maxWheelBase,
      minSeatTube: minMaxSeatTube.minSeatTube,
      maxSeatTube: minMaxSeatTube.maxSeatTube,
    };
  }

  async getShortInfo() {
    const projection = {
      title: 1,
      color: 1,
      vendorCode: 1,
    };
    const titles = await ProductModel.find({}, projection);
    if (!titles) throw ApiError.BadRequest(`Something went wrong`);
    return titles;
  }

  async setTitle(id, title) {
    if (!title) throw ApiError.BadRequest(`title not transferred`);
    await ProductModel.updateOne(
      { _id: id },
      { $set: { title } }
    );
  }

  async addThumbnail(id, img) {
    if (!img) throw ApiError.BadRequest(`image not transferred`);
    await ProductModel.updateOne(
      { _id: id },
      { $push: { thumbs: img } }
    );
  }

  async addImgToGallery(id, img) {
    if (!img) throw ApiError.BadRequest(`image not transferred`);
    await ProductModel.updateOne(
      { _id: id },
      { $push: { gallery: img } }
    );
  }

  async setDescription(id, description) {
    if (!description) throw ApiError.BadRequest(`description not transferred`);
    await ProductModel.updateOne(
      { _id: id },
      { $set: { description } }
    );
  }

  async setShortDescription(id, shortDescription) {
    if (!shortDescription) throw ApiError.BadRequest(`short description not transferred`);
    await ProductModel.updateOne(
      { _id: id },
      { $set: { shortDescription } }
    );
  }

  async setColor(id, color) {
    if (!color) throw ApiError.BadRequest(`color not transferred`);
    await ProductModel.updateOne(
      { _id: id },
      { $set: { color } }
    );
  }

  async setRating(id, rating) {
    if (!rating) throw ApiError.BadRequest(`rating not transferred`);
    await ProductModel.updateOne(
      { _id: id },
      { $set: { rating } }
    );
  }

  async setCategory(id, category) {
    if (!category) throw ApiError.BadRequest(`category not transferred`);
    await ProductModel.updateOne(
      { _id: id },
      { $set: { category } }
    );
  }

  async setOverview(id, index, overview) {
    if (index === undefined) throw ApiError.BadRequest(`index not transferred`);
    if (!overview) throw ApiError.BadRequest(`overview not transferred`);
    const overviewKey = `overview.${index}`;
    await ProductModel.updateOne(
      { _id: id },
      { $set: { [overviewKey]: overview } }
    );
  }

  async setPrice(id, price) {
    if (price === undefined) throw ApiError.BadRequest(`price not transferred`);
    await ProductModel.updateOne(
      { _id: id },
      { $set: { price } }
    );
  }

  async createProduct(productData) {
    if (!productData) throw ApiError.BadRequest(`product data not transferred`);
    const product = new ProductModel(productData);
    await product.save();
  }

  async deleteThumbnail(id, index) {
    if (typeof index !== 'number') throw ApiError.BadRequest(`wrong index`);
    const product = await ProductModel.findById(id);
    product.thumbs.splice(index, 1);
    await product.save();
  }

  async deleteImage(id, index) {
    if (index === undefined) throw ApiError.BadRequest(`index not transferred`);
    const product = await ProductModel.findById(id);
    product.gallery.splice(index, 1);
    await product.save();
  }
}

module.exports = new ProductService();
