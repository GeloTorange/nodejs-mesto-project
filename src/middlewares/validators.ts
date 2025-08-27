import { celebrate, Joi } from 'celebrate';

const fields = {
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(200),
  avatarOrLink: Joi.string().regex(/^https?:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})([-._~:/?#[\]@!$&'()*+,;=]*)#?$/),
  id: Joi.string().hex().length(24).required(),
};

export const loginValidator = celebrate({
  body: Joi.object({
    email: fields.email,
    password: fields.password,
  }),
});

export const userValidator = celebrate({
  body: Joi.object({
    name: fields.name,
    about: fields.about,
    avatar: fields.avatarOrLink,
    email: fields.email,
    password: fields.password,
  }),
});

export const updateUserInfoValidator = celebrate({
  body: Joi.object({
    name: fields.name,
    about: fields.about,
  }),
});

export const updateUserAvatarValidator = celebrate({
  body: Joi.object({
    avatar: fields.avatarOrLink,
  }),
});

export const cardValidator = celebrate({
  body: Joi.object({
    name: fields.name,
    link: fields.avatarOrLink,
  }),
});

export const userIdValidator = celebrate({
  params: Joi.object().keys({
    userId: fields.id,
  }),
});

export const cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: fields.id,
  }),
});
