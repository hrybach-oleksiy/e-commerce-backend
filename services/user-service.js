/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const UserModel = require('../models/user-model');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const mailService = require('./mail-service');

class UserService {
  async registration(email, password) {
    try {
      const candidate = await UserModel.findOne({ email });

      if (candidate) {
        throw new Error(`User with ${email} is already exist`);
      }

      const hashPassword = await bcrypt.hash(password, 3);
      const activationLink = uuid.v4();
      const user = await UserModel.create({ email, password: hashPassword, activationLink });
      await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activation/${activationLink}`);

      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });

      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      return { ...tokens, user: userDto };
    } catch (error) {
      console.log(error);
    }
  }

  async activation(activationLink) {
    const user = await UserModel.findOne({ activationLink });

    if (!user) {
      throw new Error('Wrong activation link');
    }
    user.isActivated = true;
    await user.save();
  }
}

module.exports = new UserService();
