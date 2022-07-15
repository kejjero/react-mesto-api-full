const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const { celebrate, Joi, errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const errorHandler = require('./middlewares/errorHandler');
const { regExp } = require('./utils/utils');
const NotFoundError = require('./errors/NotFoundError');

const app = express();

app.use(helmet());

app.use(cookieParser());

const { PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(regExp, 'custom validation'),
  }),
}), createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (_req, _res, next) => next(new NotFoundError('Cтраница не найдена.')));

app.use(errors());

app.use(errorHandler);

app.listen(PORT);

// я поторопился и забыл смерджить ветки, из-за этого так много ошибок :)
