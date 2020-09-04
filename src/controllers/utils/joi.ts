import joi, { SchemaMap, ValidationError } from '@hapi/joi';

export const validate = (
  data: string | unknown,
  schema: SchemaMap
): ValidationError | undefined => {
  const { error } = joi.object(schema).validate(data);
  return error;
};
