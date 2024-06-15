const productService = require('../services/product-service');
const userService = require('../services/user-service');

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

  async setTitle(req, res, next) {
    try {
      const { id, title } = req.body;
      const { refreshToken } = req.cookies;
      const isRoot = await userService.isRoot(refreshToken);
      if (isRoot) await productService.setTitle(id, title);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  }

  async addThumbnail(req, res, next) {
    try {
      const { id, fileContent } = req.body;
      const { refreshToken } = req.cookies;
      const isRoot = await userService.isRoot(refreshToken);
      if (isRoot) await productService.addThumbnail(id, fileContent);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  }

  async addImgToGallery(req, res, next) {
    try {
      const { fileContent, id } = req.body;
      const { refreshToken } = req.cookies;
      const isRoot = await userService.isRoot(refreshToken);
      if (isRoot) await productService.addImgToGallery(id, fileContent);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  }

  async setDescription(req, res, next) {
    try {
      const { id, description } = req.body;
      const { refreshToken } = req.cookies;
      const isRoot = await userService.isRoot(refreshToken);
      if (isRoot) await productService.setDescription(id, description);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  }

  async setShortDescription(req, res, next) {
    try {
      const { id, shortDescription } = req.body;
      const { refreshToken } = req.cookies;
      const isRoot = await userService.isRoot(refreshToken);
      if (isRoot) await productService.setShortDescription(id, shortDescription);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  }

  async setColor(req, res, next) {
    try {
      const { id, color } = req.body;
      const { refreshToken } = req.cookies;
      const isRoot = await userService.isRoot(refreshToken);
      if (isRoot) await productService.setColor(id, color);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  }

  async setRating(req, res, next) {
    try {
      const { id, rating } = req.body;
      const { refreshToken } = req.cookies;
      const isRoot = await userService.isRoot(refreshToken);
      if (isRoot) await productService.setRating(id, rating);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  }

  async setCategory(req, res, next) {
    try {
      const { id, category } = req.body;
      const { refreshToken } = req.cookies;
      const isRoot = await userService.isRoot(refreshToken);
      if (isRoot) await productService.setCategory(id, category);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  }

  async setOverview(req, res, next) {
    try {
      const { id, index, overview } = req.body;
      const { refreshToken } = req.cookies;
      const isRoot = await userService.isRoot(refreshToken);
      if (isRoot) await productService.setOverview(id, index, overview);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  }

  async setPrice(req, res, next) {
    try {
      const { id, price } = req.body;
      const { refreshToken } = req.cookies;
      const isRoot = await userService.isRoot(refreshToken);
      if (isRoot) await productService.setPrice(id, price);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req, res, next) {
    try {
      const productData = req.body;
      const { refreshToken } = req.cookies;
      const isRoot = await userService.isRoot(refreshToken);
      if (isRoot) await productService.createProduct(productData);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  }

  async deleteThumbnail(req, res, next) {
    const { id, index } = req.params;
    try {
      const { refreshToken } = req.cookies;
      const isRoot = await userService.isRoot(refreshToken);
      if (isRoot) await productService.deleteThumbnail(id, +index);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  }

  async deleteImage(req, res, next) {
    const { id, index } = req.params;
    try {
      const { refreshToken } = req.cookies;
      const isRoot = await userService.isRoot(refreshToken);
      if (isRoot) await productService.deleteImage(id, +index);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
