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

  async getProduct(req, res, next) {
    const vendorCode = req.query.vc;
    console.log(vendorCode);
    try {
      const product = await productService.getProduct(vendorCode);
      return res.json(product);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
