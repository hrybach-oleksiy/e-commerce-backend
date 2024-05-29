const { Schema } = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Specs:
 *       type: object
 *       properties:
 *         frameset:
 *           type: object
 *           properties:
 *             Frame:
 *               type: string
 *               description: Frame of the bike.
 *               example: "Aluminum"
 *             Fork:
 *               type: string
 *               description: Fork of the bike.
 *               example: "Carbon"
 *         drivetrain:
 *           type: object
 *           properties:
 *             Crank Set:
 *               type: string
 *               description: Crank set of the bike.
 *               example: "Shimano Ultegra"
 *             Chainwheel:
 *               type: string
 *               description: Chainwheel of the bike.
 *               example: "Shimano"
 *             Bottom Bracket:
 *               type: string
 *               description: Bottom bracket of the bike.
 *               example: "Shimano Hollowtech II"
 *             Sprocket:
 *               type: string
 *               description: Sprocket of the bike.
 *               example: "Shimano"
 *             Freewheel:
 *               type: string
 *               description: Freewheel of the bike.
 *               example: "Shimano"
 *             Rear Shifter:
 *               type: string
 *               description: Rear shifter of the bike.
 *               example: "Shimano Ultegra"
 *             Chain:
 *               type: string
 *               description: Chain of the bike.
 *               example: "Shimano Ultegra"
 *             Pedals:
 *               type: string
 *               description: Pedals of the bike.
 *               example: "Shimano PD-R550"
 *         brakes:
 *           type: object
 *           properties:
 *             Front Brake:
 *               type: string
 *               description: Front brake of the bike.
 *               example: "Shimano Ultegra"
 *             Rear Brake:
 *               type: string
 *               description: Rear brake of the bike.
 *               example: "Shimano Ultegra"
 *             Brake Lever:
 *               type: string
 *               description: Brake lever of the bike.
 *               example: "Shimano Ultegra"
 *         components:
 *           type: object
 *           properties:
 *             Handlebar:
 *               type: string
 *               description: Handlebar of the bike.
 *               example: "Zipp SL-70"
 *             Stem:
 *               type: string
 *               description: Stem of the bike.
 *               example: "Zipp Service Course"
 *             Grips:
 *               type: string
 *               description: Grips of the bike.
 *               example: "Lizard Skins"
 *             Saddle:
 *               type: string
 *               description: Saddle of the bike.
 *               example: "Fizik Arione"
 *             Seat post:
 *               type: string
 *               description: Seat post of the bike.
 *               example: "Zipp Service Course"
 *             Seat clamp:
 *               type: string
 *               description: Seat clamp of the bike.
 *               example: "Integrated"
 *         wheels:
 *           type: object
 *           properties:
 *             Front Wheel:
 *               type: string
 *               description: Front wheel of the bike.
 *               example: "Zipp 404"
 *             Rear Wheel:
 *               type: string
 *               description: Rear wheel of the bike.
 *               example: "Zipp 404"
 *             Front Hub:
 *               type: string
 *               description: Front hub of the bike.
 *               example: "Zipp"
 *             Rear Hub:
 *               type: string
 *               description: Rear hub of the bike.
 *               example: "Zipp"
 *             Spokes:
 *               type: string
 *               description: Spokes of the bike.
 *               example: "Sapim CX-Ray"
 *             Rims:
 *               type: string
 *               description: Rims of the bike.
 *               example: "Zipp 404"
 *             Tires:
 *               type: string
 *               description: Tires of the bike.
 *               example: "Continental GP4000S II"
 *             Tubes:
 *               type: string
 *               description: Tubes of the bike.
 *               example: "Continental"
 */

const specsSchema = new Schema({
  frameset: {
    Frame: String,
    Fork: String,
  },
  drivetrain: {
    'Crank Set': String,
    Chainwheel: String,
    'Bottom Bracket': String,
    Sprocket: String,
    Freewheel: String,
    'Rear Shifter': String,
    Chain: String,
    Pedals: String,
  },
  brakes: {
    'Front Brake': String,
    'Rear Brake': String,
    'Brake Lever': String,
  },
  components: {
    Handlebar: String,
    Stem: String,
    Grips: String,
    Saddle: String,
    'Seat post': String,
    'Seat clamp': String,
  },
  wheels: {
    'Front Wheel': String,
    'Rear Wheel': String,
    'Front Hub': String,
    'Rear Hub': String,
    Spokes: String,
    Rims: String,
    Tires: String,
    Tubes: String,
  },
});

module.exports = specsSchema;
