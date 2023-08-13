const { celebrate, Joi } = require('celebrate');

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).optional(),
    about: Joi.string().min(2).max(30).optional(),
    avatar: Joi.string()
      .optional()
      .pattern(
        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{1,6}\b([-a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*)$/
      ),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validationGetUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

const validationUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validationChangeUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .pattern(
        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{1,6}\b([-a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*)$/
      ),
  }),
});

const validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string()
      .required()
      .pattern(
        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{1,6}\b([-a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*)$/
      ),
  }),
});

const validationDeleteCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const validationLikeCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const validationDislikeCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  validationLogin,
  validationCreateUser,
  validationGetUserId,
  validationUpdateUserInfo,
  validationChangeUserAvatar,
  validationCreateCard,
  validationDeleteCard,
  validationLikeCard,
  validationDislikeCard,
};
