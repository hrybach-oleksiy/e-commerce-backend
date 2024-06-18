const { Promo } = require('../models/promo-model');

class PromoService {
  async listPromos() {
    const promos = await Promo.find({});
    return promos;
  }

  async cretePromo(payload) {
    let promo = await Promo.findOne({ code: payload.code });
    if (promo) {
      throw new Error(`promo with code=${payload.code} already exists`);
    }
    promo = new Promo({
      code: payload.code,
      discount: payload.discount,
      // use only 'percentage' at the moment
      discountType: 'percentage',
    });
    await promo.save();
    return promo;
  }

  async deletePromoById(id) {
    await Promo.deleteOne({ _id: id });
  }
}

module.exports = new PromoService();
