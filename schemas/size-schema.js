const { Schema } = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Size:
 *       type: object
 *       properties:
 *         Seat Tube:
 *           type: number
 *           description: The length of the seat tube measured from the center to the top.
 *           example: 440
 *         Top Tube Horizontal:
 *           type: number
 *           description: The effective length of the top tube.
 *           example: 535
 *         Head Angle:
 *           type: number
 *           format: decimal
 *           description: The angle of the head tube.
 *           example: 73.5
 *         Seat Angle:
 *           type: number
 *           format: decimal
 *           description: The angle of the seat tube.
 *           example: 74.0
 *         Chainstays:
 *           type: number
 *           description: The length of the chainstay.
 *           example: 455
 *         BB-Height To Hub:
 *           type: number
 *           description: The bottom bracket drop.
 *           example: 70
 *         Wheel Base:
 *           type: number
 *           description: The total wheelbase of the bike.
 *           example: 1070
 *         Head Tube:
 *           type: number
 *           description: The length of the head tube.
 *           example: 90
 *         Reach:
 *           type: number
 *           description: The sit-bone to centre-of-handlebar measurement.
 *           example: 402
 *         Stack:
 *           type: number
 *           description: The vertical distance from the center of the bottom bracket to the virtual horizontal line from the top of the head tube.
 *           example: 615
 */

const sizeSchema = new Schema({
  'Seat Tube': Number,
  'Top Tube Horizontal': Number,
  'Head Tube Angle': Number,
  'Seat Angle': Number,
  Chainstays: Number,
  'BB-Height To Hub': Number,
  'Wheel Base H': Number,
  'Head Tube': Number,
  Reach: Number,
  Stack: Number,
});

module.exports = sizeSchema;
