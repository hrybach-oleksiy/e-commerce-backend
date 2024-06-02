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
 *             frame:
 *               type: string
 *               description: Frame of the bike.
 *               example: "Aluminum"
 *             fork:
 *               type: string
 *               description: Fork of the bike.
 *               example: "Carbon"
 *         drivetrain:
 *           type: object
 *           properties:
 *             crankSet:
 *               type: string
 *               description: Crank set of the bike.
 *               example: "Shimano Ultegra"
 *             chainwheel:
 *               type: string
 *               description: Chainwheel of the bike.
 *               example: "Shimano"
 *             bottomBracket:
 *               type: string
 *               description: Bottom bracket of the bike.
 *               example: "Shimano Hollowtech II"
 *             sprocket:
 *               type: string
 *               description: Sprocket of the bike.
 *               example: "Shimano"
 *             freewheel:
 *               type: string
 *               description: Freewheel of the bike.
 *               example: "Shimano"
 *             rearShifter:
 *               type: string
 *               description: Rear shifter of the bike.
 *               example: "Shimano Ultegra"
 *             chain:
 *               type: string
 *               description: Chain of the bike.
 *               example: "Shimano Ultegra"
 *             pedals:
 *               type: string
 *               description: Pedals of the bike.
 *               example: "Shimano PD-R550"
 *         brakes:
 *           type: object
 *           properties:
 *             frontBrake:
 *               type: string
 *               description: Front brake of the bike.
 *               example: "Shimano Ultegra"
 *             rearBrake:
 *               type: string
 *               description: Rear brake of the bike.
 *               example: "Shimano Ultegra"
 *             brakeLever:
 *               type: string
 *               description: Brake lever of the bike.
 *               example: "Shimano Ultegra"
 *         components:
 *           type: object
 *           properties:
 *             handlebar:
 *               type: string
 *               description: Handlebar of the bike.
 *               example: "Zipp SL-70"
 *             stem:
 *               type: string
 *               description: Stem of the bike.
 *               example: "Zipp Service Course"
 *             grips:
 *               type: string
 *               description: Grips of the bike.
 *               example: "Lizard Skins"
 *             saddle:
 *               type: string
 *               description: Saddle of the bike.
 *               example: "Fizik Arione"
 *             seatPost:
 *               type: string
 *               description: Seat post of the bike.
 *               example: "Zipp Service Course"
 *             seatClamp:
 *               type: string
 *               description: Seat clamp of the bike.
 *               example: "Integrated"
 *         wheels:
 *           type: object
 *           properties:
 *             frontWheel:
 *               type: string
 *               description: Front wheel of the bike.
 *               example: "Zipp 404"
 *             rearWheel:
 *               type: string
 *               description: Rear wheel of the bike.
 *               example: "Zipp 404"
 *             frontHub:
 *               type: string
 *               description: Front hub of the bike.
 *               example: "Zipp"
 *             rearHub:
 *               type: string
 *               description: Rear hub of the bike.
 *               example: "Zipp"
 *             spokes:
 *               type: string
 *               description: Spokes of the bike.
 *               example: "Sapim CX-Ray"
 *             rims:
 *               type: string
 *               description: Rims of the bike.
 *               example: "Zipp 404"
 *             tires:
 *               type: string
 *               description: Tires of the bike.
 *               example: "Continental GP4000S II"
 *             tubes:
 *               type: string
 *               description: Tubes of the bike.
 *               example: "Continental"
 */

const specsSchema = new Schema(
  {
    frameset: {
      frame: String,
      fork: String,
    },
    drivetrain: {
      crankSet: String,
      chainwheel: String,
      bottomBracket: String,
      sprocket: String,
      freewheel: String,
      rearShifter: String,
      chain: String,
      pedals: String,
    },
    brakes: {
      frontBrake: String,
      rearBrake: String,
      brakeLever: String,
    },
    components: {
      handlebar: String,
      stem: String,
      grips: String,
      saddle: String,
      seatPost: String,
      seatClamp: String,
    },
    wheels: {
      frontWheel: String,
      rearWheel: String,
      frontHub: String,
      rearHub: String,
      spokes: String,
      rims: String,
      tires: String,
      tubes: String,
    },
  },
  { _id: false },
);

module.exports = specsSchema;
