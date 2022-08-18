const jwt = require('jsonwebtoken');
const AuthorisationError = require('../errors/AuthorisationError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, _res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-code');
  } catch (err) {
    return next(new AuthorisationError('Необходимо авторизироваться'));
  }
  req.user = payload;

  return next();
};
