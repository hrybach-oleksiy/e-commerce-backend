const bcrypt = require('bcrypt');
const uuid = require('uuid');
const UserModel = require('../models/user-model');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const mailService = require('./mail-service');

class UserService {
  async registration(body) {
    try {
      const { email, password, firstName, lastName, dateOfBirth, street, city, postalCode, country } = body;
      const candidate = await UserModel.findOne({ email });

      if (candidate) {
        throw new Error(`User with ${email} is already exist`);
      }

      const hashPassword = await bcrypt.hash(password, 3);
      const activationLink = uuid.v4();
      const user = await UserModel.create({
        email,
        password: hashPassword,
        activationLink,
        firstName,
        lastName,
        dateOfBirth,
        street,
        city,
        postalCode,
        country,
      });
      await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activation/${activationLink}`);

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

  async login(email, password) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error('The user with such email was not found');
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw new Error('Invalid Password');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new Error();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw new Error();
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
}

module.exports = new UserService();
