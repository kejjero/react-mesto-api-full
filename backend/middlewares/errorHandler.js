const errorHandler = (err, _req, res, next) => {
  if (err.code) {
    return res.status(err.code).send({ message: err.message || 'Ошибка по умолчанию' });
  }
  res.status(500).send({ message: 'На сервере произошла ошибка' });
  return next();
};

module.exports = errorHandler;
