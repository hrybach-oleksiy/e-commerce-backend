const promoService = require('../services/promo-service');

class PromoController {
  async listPromos(req, res, next) {
    try {
      const promos = await promoService.listPromos();
      return res.json(promos);
    } catch (error) {
      next(error);
    }
  }

  async cretePromo(req, res, next) {
    try {
      const promo = await promoService.cretePromo(req.body);
      return res.json(promo);
    } catch (error) {
      next(error);
    }
  }

  async deletePromoById(req, res, next) {
    try {
      await promoService.deletePromoById(req.params.id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PromoController();
