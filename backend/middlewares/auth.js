const jwt = require('jsonwebtoken');
const AuthorisationError = require('../errors/AuthError');

const { JWT_SECRET = 'some-secret-key' } = process.env;

module.exports = (req, _res, next) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthorisationError('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};
