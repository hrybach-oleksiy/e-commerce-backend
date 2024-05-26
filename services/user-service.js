const bcrypt = require('bcrypt');
const uuid = require('uuid');
const UserModel = require('../models/user-model');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const mailService = require('./mail-service');
const ApiError = require('../exceptions/api-error');

const errDublicateKey = 11000;
const saltRounds = 10;

class UserService {
  async registration(body) {
    const { email, password, firstName, lastName, dateOfBirth, addresses } = body;
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(`User with ${email} is already exist`);
    }

    const hashPassword = await this.getHashedPassword(password);
    const activationLink = uuid.v4();
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
      firstName,
      lastName,
      dateOfBirth,
      addresses: {
        shippingAddresses: addresses.shippingAddresses,
        billingAddresses: addresses.billingAddresses,
      },
    });

    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/users/activation/${activationLink}`);

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ sub: userDto.id });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async checkEmailExists(email) {
    const user = await UserModel.findOne({ email });
    return Boolean(user);
  }

  async activation(activationLink) {
    const user = await UserModel.findOne({ activationLink });

    if (!user) {
      throw ApiError.BadRequest('Wrong activation link');
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest('The user with such email was not found');
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest('Invalid Password');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ sub: userDto.id });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.sub);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ sub: userDto.id });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async update(userID, fieldsToUpdate) {
    const user = await UserModel.findById(userID);
    if (!user) {
      throw ApiError.NotFoundError('User not found.');
    }
    if (fieldsToUpdate.password && typeof fieldsToUpdate.password === 'string') {
      fieldsToUpdate.password = await this.getHashedPassword(fieldsToUpdate.password);
    }
    try {
      await UserModel.findOneAndUpdate({ _id: userID }, fieldsToUpdate);
    } catch (error) {
      if (error.code === errDublicateKey) {
        throw ApiError.BadRequest('User with such email already exists.');
      }
      throw error;
    }
    const updatedUser = await UserModel.findById(userID);
    return new UserDto(updatedUser);
  }

  async getHashedPassword(password) {
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }
}

module.exports = new UserService();
