const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const DuplicateError = require('../errors/DuplicateError');

const { JWT_SECRET = 'some-secret-key' } = process.env;
const MONGO_DUPLICATE_KEY_CODE = 11000;

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: ((24 * 360000) * 7),
        httpOnly: true,
      });
      res.send({ token });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({
      data: {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      },
    }))
    .catch((err) => {
      if (err.code === MONGO_DUPLICATE_KEY_CODE) {
        throw next(new DuplicateError('email уже зарегистрирован'));
      }
      if (err.name === 'ValidationError') {
        throw next(new BadRequestError('Данные некорректны'));
      }
      return next(err);
    });
};

const getUsers = (_, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      next(new ServerError({ message: 'Ошибка сервера' }));
    });
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((users) => {
      if (!users) {
        throw next(new NotFoundError({ message: 'Пользователь с таким id не найден.' }));
      }
      res.status(200).send({ data: users });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw next(new BadRequestError({ message: 'Передан некорректный id.' }));
      }
      next(new ServerError({ message: 'Ошибка сервера' }));
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw next(new BadRequestError('Данные некорректны'));
      }
      next(new ServerError({ message: 'Ошибка сервера' }));
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с id не найден');
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw next(new BadRequestError({ message: 'Данные некорректны' }));
      }
      next(new ServerError({ message: 'Ошибка сервера' }));
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }

      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw next(new BadRequestError('Переданный _id некорректный'));
      }
      return next(err);
    });
};

module.exports = {
  createUser, getUsers, getUser, updateUser, updateAvatar, login, getCurrentUser,
};
