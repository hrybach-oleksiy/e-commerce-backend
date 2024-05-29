const productService = require('../services/product-service');

class ProductController {
  async getProducts(req, res, next) {
    try {
      const filter = req.body;
      const products = await productService.getProducts(filter);
      return res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async getAllProductsData(req, res, next) {
    console.log(req.body);
    try {
      const products = await productService.getAllProductsData(req);
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
}

module.exports = new ProductController();
