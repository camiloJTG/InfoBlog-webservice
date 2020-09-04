import joi from '@hapi/joi';

const roleNameSchema = joi.string().max(100).min(1).trim();
export const roleId = joi.number();

export const createRolesSchema = {
  roleName: roleNameSchema.required(),
};

export const updateRolesSchema = {
  roleName: roleNameSchema,
};
