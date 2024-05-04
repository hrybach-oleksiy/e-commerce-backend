const userService = require('../services/user-service');

class UserController {
  async registration(req, res) {
    try {
      const COOKIE_AGE = 30 * 24 * 60 * 60 * 1000;
      const { body } = req;
      //   const { email, password, firstName, lastName, dateOfBirth, street, city, postalCode, country } = req.body;
      const userData = await userService.registration(body);

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

  async login(req, res) {
    const COOKIE_AGE = 30 * 24 * 60 * 60 * 1000;
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);

      res.cookie('refreshToken', userData.refreshToken, { maxAge: COOKIE_AGE, httpOnly: true });
      return res.json(userData);
    } catch (error) {
      console.log(error);
    }
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);

      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (error) {
      console.log(error);
    }
  }

  async refresh(req, res) {
    const COOKIE_AGE = 30 * 24 * 60 * 60 * 1000;
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);

      res.cookie('refreshToken', userData.refreshToken, { maxAge: COOKIE_AGE, httpOnly: true });
      return res.json(userData);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserController();
