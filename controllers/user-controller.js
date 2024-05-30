const userService = require('../services/user-service');
const ApiError = require('../exceptions/api-error');

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
    if (req.userID !== req.params.userID) {
      return next(ApiError.ForbiddenError());
    }
    const arg = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      password: req.body.password,
      newPassword: req.body.newPassword,
    };
    try {
      const updatedUser = await userService.update(req.userID, arg);
      return resp.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async addAddress(req, resp, next) {
    if (req.userID !== req.params.userID) {
      return next(ApiError.ForbiddenError());
    }
    if (req.params.type !== 'shipping' && req.params.type !== 'billing') {
      return next(ApiError.BadRequest('Unknown address type.'));
    }
    const addressType = req.params.type + 'Addresses';
    const address = {
      street: req.body.street,
      city: req.body.city,
      postalCode: req.body.postalCode,
      country: req.body.country,
      isDefault: req.body.isDefault,
    };
    try {
      const savedAddress = await userService.addAddress(req.userID, addressType, address);
      return resp.json(savedAddress);
    } catch (error) {
      next(error);
    }
  }

  async deleteAddress(req, resp, next) {
    if (req.userID !== req.params.userID) {
      return next(ApiError.ForbiddenError());
    }
    if (req.params.type !== 'shipping' && req.params.type !== 'billing') {
      return next(ApiError.BadRequest('Unknown address type.'));
    }
    const addressType = req.params.type + 'Addresses';
    try {
      await userService.deleteAddress(req.userID, addressType, req.params.id);
      return resp.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async updateAddress(req, resp, next) {
    if (req.userID !== req.params.userID) {
      return next(ApiError.ForbiddenError());
    }
    if (req.params.type !== 'shipping' && req.params.type !== 'billing') {
      return next(ApiError.BadRequest('Unknown address type.'));
    }
    const addressType = req.params.type + 'Addresses';
    const address = {
      id: req.params.id,
      street: req.body.street,
      city: req.body.city,
      postalCode: req.body.postalCode,
      country: req.body.country,
      isDefault: req.body.isDefault,
    };
    try {
      const updatedAddress = await userService.updateAddress(req.userID, addressType, address);
      return resp.json(updatedAddress);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
