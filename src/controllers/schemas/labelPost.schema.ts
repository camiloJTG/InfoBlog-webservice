import joi from '@hapi/joi';

const postIdSchema = joi.number();
const labelIdSchema = joi.array();

export const postLabelIdSchema = joi.number();
