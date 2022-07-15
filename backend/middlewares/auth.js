const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new AuthError('Необходима авторизация'));
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
    } catch (err) {
      next(new AuthError('Необходима авторизация'));
      return;
    }

    req.user = payload;
  }
  next();
};
