import * as Joi from '@hapi/joi';

// export const LoginSchema = Joi.object({
//   email: Joi.string().required(),
//   password: Joi.number().required(),
// });

export const AuthSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.number().required(),
});

const LinkSchema = Joi.object({
  position: Joi.number().required(),
  link: Joi.string().required(),
  length: Joi.number().required(),
});

export const noteSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
  links: [LinkSchema],
});

export const option = {
  abortEarly: false,
  errors: {
    wrap: {
      label: '',
    },
  },
};
