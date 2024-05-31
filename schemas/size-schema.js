const { Schema } = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Size:
 *       type: object
 *       properties:
 *         seatTube:
 *           type: number
 *           description: The length of the seat tube measured from the center to the top.
 *           example: 440
 *         topTube Horizontal:
 *           type: number
 *           description: The effective length of the top tube.
 *           example: 535
 *         headAngle:
 *           type: number
 *           format: decimal
 *           description: The angle of the head tube.
 *           example: 73.5
 *         seatAngle:
 *           type: number
 *           format: decimal
 *           description: The angle of the seat tube.
 *           example: 74.0
 *         chainstays:
 *           type: number
 *           description: The length of the chainstay.
 *           example: 455
 *         bbHeightToHub:
 *           type: number
 *           description: The bottom bracket drop.
 *           example: 70
 *         wheelBase:
 *           type: number
 *           description: The total wheelbase of the bike.
 *           example: 1070
 *         headTube:
 *           type: number
 *           description: The length of the head tube.
 *           example: 90
 *         reach:
 *           type: number
 *           description: The sit-bone to centre-of-handlebar measurement.
 *           example: 402
 *         stack:
 *           type: number
 *           description: The vertical distance from the center of the bottom bracket to the virtual horizontal line from the top of the head tube.
 *           example: 615
 */

const sizeGridSchema = new Schema(
  {
    small: Number,
    medium: Number,
    large: Number,
  },
  { _id: false },
);

const sizeSchema = new Schema(
  {
    seatTube: sizeGridSchema,
    topTubeHorizontal: sizeGridSchema,
    headTubeAngle: sizeGridSchema,
    seatAngle: sizeGridSchema,
    chainstays: sizeGridSchema,
    bbHeightToHub: sizeGridSchema,
    wheelBase: sizeGridSchema,
    headTube: sizeGridSchema,
    reach: sizeGridSchema,
    stack: sizeGridSchema,
  },
  { _id: false },
);

module.exports = sizeSchema;
