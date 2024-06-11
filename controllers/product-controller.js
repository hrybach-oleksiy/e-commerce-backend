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

  async getBestSellingProducts(req, res, next) {
    try {
      const products = await productService.getBestSellingProducts();
      return res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async getProduct(req, res, next) {
    const vendorCode = req.query.vc;
    try {
      const product = await productService.getProduct(vendorCode);
      return res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async getFiltersData(req, res, next) {
    try {
      const filtersData = await productService.getFiltersData();
      return res.json(filtersData);
    } catch (error) {
      next(error);
    }
  }

  async getShortInfo(req, res, next) {
    try {
      const titlesAndColors = await productService.getShortInfo();
      return res.json(titlesAndColors);
    } catch (error) {
      next(error);
    }
  }

  async addThumbnail(req, res, next) {
    try {
      const { id, fileContent } = req.body;
      productService.addThumbnail(id, fileContent);
      res.send('ok baby');
    } catch (error) {
      next(error);
    }
  }

  async addImgToGallery(req, res, next) {
    try {
      const { fileContent, id } = req.body;
      productService.addImgToGallery(id, fileContent);
      res.send('ok baby');
    } catch (error) {
      next(error);
    }
  }

  async setDescription(req, res, next) {
    try {
      const { id, description } = req.body;
      productService.setDescription(id, description);
      res.send('ok baby');
    } catch (error) {
      next(error);
    }
  }

  async setShortDescription(req, res, next) {
    try {
      const { id, shortDescription } = req.body;
      productService.setShortDescription(id, shortDescription);
      res.send('ok baby');
    } catch (error) {
      next(error);
    }
  }

  async setColor(req, res, next) {
    console.log(req.body);
    try {
      const { id, color } = req.body;
      productService.setColor(id, color);
      res.send('ok baby');
    } catch (error) {
      next(error);
    }
  }

  async setRating(req, res, next) {
    console.log(req.body);
    try {
      const { id, rating } = req.body;
      productService.setRating(id, rating);
      res.send('ok baby');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
