/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
const bcrypt = require('bcrypt');
const UserModel = require('../models/user-model');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');

class UserService {
  async registration(email, password) {
    try {
      const candidate = await UserModel.findOne({ email });

      if (candidate) {
        throw new Error(`User with ${email} is already exist`);
      }

      const hashPassword = await bcrypt.hash(password, 3);
      const user = await UserModel.create({ email, password: hashPassword });
      const userDto = new UserDto(user); // id, email
      const tokens = tokenService.generateTokens({ ...userDto });

      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      return { ...tokens, user: userDto };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserService();
