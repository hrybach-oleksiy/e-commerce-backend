const productService = require('../services/product-service');

class ProductController {
  async getProducts(req, res, next) {
    try {
      const payload = req.body;
      const products = await productService.getProducts(payload);
      return res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const productId = req.params.id;
      const product = await productService.getProductById(productId);
      return res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async getFilters(req, res, next) {
    try {
      const filtersData = await productService.getFilters();
      return res.json(filtersData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
