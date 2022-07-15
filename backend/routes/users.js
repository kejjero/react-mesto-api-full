const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regExp } = require('../utils/utils');

const {
  updateUser,
  updateAvatar,
  getUsers,
  getUser,
  getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.get('/', getUsers);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().min(2).custom(regExp),
  }),
}), updateAvatar);

module.exports = router;
