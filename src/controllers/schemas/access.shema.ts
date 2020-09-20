import joi from '@hapi/joi';

const loginUsernameSchema = joi.string().trim();
const loginPasswordSchema = joi.string().trim();

export const login = {
  MAIL: loginUsernameSchema.required(),
  PASSWORD: loginPasswordSchema.required(),
};
