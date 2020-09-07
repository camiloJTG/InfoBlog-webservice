import joi from '@hapi/joi';

const userUsernameSchema = joi.string().max(100).min(1).trim();
const userMailSchema = joi.string().max(100).min(1).trim();
const userPasswordSchema = joi.string().max(100).min(1).trim();

export const userId = joi.number();

export const createUserSchema = {
  USERNAME: userUsernameSchema.required(),
  PASSWORD: userPasswordSchema.required(),
  MAIL: userMailSchema.required(),
};

export const updateUsersSchema = {
  USERNAME: userUsernameSchema,
  PASSWORD: userPasswordSchema,
  MAIL: userMailSchema,
};
