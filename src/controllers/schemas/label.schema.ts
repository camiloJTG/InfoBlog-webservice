import joi from '@hapi/joi';

const labelNameSchema = joi.string().max(100).min(1).trim();
export const labelId = joi.number();

export const createLabelSchema = {
  NAME: labelNameSchema.required(),
};

export const updateLabelSchema = {
  NAME: labelNameSchema,
};
