const ApiError = require('../exceptions/api-error');
const tokenService = require('../services/token-service');

const authType = 'bearer';

function auth(req, res, next) {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    console.log('Authorization header is empty');
    throw ApiError.UnauthorizedError();
  }
  const split = authHeader.split(' ');
  if (split.length !== 2) {
    console.log(`Invalid JWT token format ${authHeader}`);
    throw ApiError.ForbiddenError();
  }
  if (split[0].toLowerCase() !== authType) {
    console.log(`Unsupported authentication type ${split[0]}`);
    throw ApiError.ForbiddenError();
  }
  const payload = tokenService.validateAccessToken(split[1]);
  if (!payload || !payload.sub) {
    console.log('Failed to validate JWT token');
    throw ApiError.ForbiddenError();
  }
  req.userID = payload.sub;
  next();
}

module.exports = { auth };
