const { Schema } = require('mongoose');

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
