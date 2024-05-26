const { response } = require('express');
const userService = require('../services/user-service');
const tokenService = require('../services/token-service');

class UserController {
  async registration(req, res, next) {
    try {
      const COOKIE_AGE = 30 * 24 * 60 * 60 * 1000;
      const { body } = req;
      const userData = await userService.registration(body);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: COOKIE_AGE,
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      });
      res.status(201).json(userData);
    } catch (error) {
      next(error);
    }
  }

  async checkEmail(req, res, next) {
    const email = req.body.email;
    try {
      const exists = await userService.checkEmailExists(email);
      res.status(200).json({ email, exists });
    } catch (error) {
      console.error('Failed to check email availability:', error);
      next(error);
    }
  }

  async activation(req, res, next) {
    try {
      const activationLink = req.params.link;

      await userService.activation(activationLink);
      res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    const COOKIE_AGE = 30 * 24 * 60 * 60 * 1000;
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: COOKIE_AGE,
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      });
      res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);

      res.clearCookie('refreshToken');
      res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    const COOKIE_AGE = 30 * 24 * 60 * 60 * 1000;
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: COOKIE_AGE,
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      });
      res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async update(req, resp, next) {
    const fieldsToUpdate = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      password: req.body.password,
    };
    if (req.body.addresses) {
      fieldsToUpdate.addresses = {
        shippingAddresses: req.body.addresses.shippingAddresses,
        billingAddresses: req.body.addresses.billingAddresses,
      };
    }
    try {
      const updatedUser = await userService.update(req.userID, fieldsToUpdate);
      return resp.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
