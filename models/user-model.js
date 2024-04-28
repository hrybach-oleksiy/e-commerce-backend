const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },

  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
});

module.exports = model('User', userSchema);
