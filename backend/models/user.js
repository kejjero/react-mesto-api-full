const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const AuthError = require('../errors/AuthError');
const { regExp } = require('../utils/utils');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    required: [false, 'необязательное поле для заполнения'],
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная длина 30 символов'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    required: [false, 'необязательное поле для заполнения'],
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная длина 30 символов'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    required: [false, 'необязательное поле для заполнения'],
    validate: { validator: regExp, message: 'Введите правильный URL' },
  },
  email: {
    type: String,
    required: [true, 'Обязательное поле для заполнения'],
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
    },
  },
  password: {
    type: String,
    required: [true, 'Обязательное поле для заполнения'],
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
