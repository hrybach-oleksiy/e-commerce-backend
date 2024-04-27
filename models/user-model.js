const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    // validate(value) {
    //   if (!validator.isEmail(value)) {
    //     throw new Error('Email is invalid');
    //   }
    // },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
    trim: true,
    // validate(value) {
    //   if (value.toLowerCase().includes('password')) {
    //     throw new Error("password musn't contain password");
    //   }
    // },
  },
});

module.exports = model('User', userSchema);
