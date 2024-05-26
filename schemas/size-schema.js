const { Schema } = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Size:
 *       type: object
 *       properties:
 *         Seat Tube (C-T) A:
 *           type: number
 *           description: The length of the seat tube measured from the center to the top.
 *           example: 54
 *         Top Tube (Effective) B:
 *           type: number
 *           description: The effective length of the top tube.
 *           example: 56
 *         Head Angle C:
 *           type: number
 *           format: decimal
 *           description: The angle of the head tube.
 *           example: 73.5
 *         Seat Angle D:
 *           type: number
 *           format: decimal
 *           description: The angle of the seat tube.
 *           example: 74.0
 *         Chainstay E:
 *           type: number
 *           description: The length of the chainstay.
 *           example: 410
 *         BB Drop F:
 *           type: number
 *           format: decimal
 *           description: The bottom bracket drop.
 *           example: 70
 *         Fork Offset G:
 *           type: number
 *           description: The offset of the fork.
 *           example: 45
 *         Wheel Base H:
 *           type: number
 *           description: The total wheelbase of the bike.
 *           example: 985
 *         Head Tube Length I:
 *           type: number
 *           description: The length of the head tube.
 *           example: 140
 *         Standover:
 *           type: string
 *           description: The standover height.
 *           example: "31.5"
 */

const sizeSchema = new Schema({
  'Seat Tube (C-T) A': Number,
  'Top Tube (Effective) B': Number,
  'Head Angle C': Number,
  'Seat Angle D': Number,
  'Chainstay E': Number,
  'BB Drop F': Number,
  'Fork Offset G': Number,
  'Wheel Base H': Number,
  'Head Tube Length I': Number,
  Standover: String,
});

module.exports = sizeSchema;
