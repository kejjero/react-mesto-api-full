class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.code = 403;
  }
}

module.exports = ForbiddenError;
