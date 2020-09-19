import joi from '@hapi/joi';

const commentaryDescriptionSchema = joi.string();
export const commentaryUserIdSchema = joi.number();
export const commentaryPostIdSchema = joi.number();

export const createCommentarySchema = {
  DESCRIPTION: commentaryDescriptionSchema.required(),
  USER: commentaryUserIdSchema.required(),
  POST: commentaryPostIdSchema.required(),
};

export const getByUserAndPostId = {
  USER: commentaryUserIdSchema.required(),
  POST: commentaryPostIdSchema.required(),
};
