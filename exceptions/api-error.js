module.exports = class ApiError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static NotFoundError(message) {
    return new ApiError(404, message || 'Not found');
  }

  static UnauthorizedError() {
    return new ApiError(401, 'User is not authorized');
  }

  static ForbiddenError() {
    return new ApiError(403, 'Forbidden');
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
};
