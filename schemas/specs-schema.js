const { Schema } = require('mongoose');

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
