import joi from '@hapi/joi';

const postTitleSchemma = joi.string().max(100).min(1).trim();
const postDescriptionSchema = joi.string().trim();
const postUserIdSchema = joi.number();

export const postId = joi.number();

export const createPostSchema = {
  TITLE: postTitleSchemma.required(),
  DESCRIPTION: postDescriptionSchema.required(),
  USER: postUserIdSchema.required(),
};

export const updatePostSchema = {
  TITLE: postTitleSchemma,
  DESCRIPTION: postDescriptionSchema,
  USER: postUserIdSchema.required(),
};
