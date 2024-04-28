/* eslint-disable consistent-return */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const userService = require('../services/user-service');

class UserController {
  async registration(req, res) {
    try {
      const COOKIE_AGE = 30 * 24 * 60 * 60 * 1000;
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);

      res.cookie('refreshToken', userData.refreshToken, { maxAge: COOKIE_AGE, httpOnly: true });
      return res.json(userData);
    } catch (error) {
      console.log(error);
    }
  }

  async activation(req, res) {
    try {
      const activationLink = req.params.link;

      await userService.activation(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserController();
