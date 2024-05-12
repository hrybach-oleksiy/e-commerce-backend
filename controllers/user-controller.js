const { response } = require('express');
const userService = require('../services/user-service');

class UserController {
  async registration(req, res, next) {
    try {
      const COOKIE_AGE = 30 * 24 * 60 * 60 * 1000;
      const { body } = req;
      const userData = await userService.registration(body);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: COOKIE_AGE, httpOnly: true });
      res.status(201).json(userData);
    } catch (error) {
      next(error);
    }
  }

  async activation(req, res, next) {
    try {
      const activationLink = req.params.link;

      await userService.activation(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    const COOKIE_AGE = 30 * 24 * 60 * 60 * 1000;
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);

      res.cookie('refreshToken', userData.refreshToken, { maxAge: COOKIE_AGE, httpOnly: true });
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
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    const COOKIE_AGE = 30 * 24 * 60 * 60 * 1000;
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);

      res.cookie('refreshToken', userData.refreshToken, { maxAge: COOKIE_AGE, httpOnly: true });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
