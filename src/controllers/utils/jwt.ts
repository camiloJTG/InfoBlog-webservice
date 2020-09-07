import jwt, { Secret } from 'jsonwebtoken';
import { config } from '../../configs/config';

const secret: Secret = config.jwt.secretKey;

export const sign = (payload: string): string => {
  const token = jwt.sign(payload, secret, {
    expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
  });
  return token;
};

export const verify = (token: string): string | unknown => {
  const result = jwt.verify(token, secret);
  return result;
};

export const decode = (
  token: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): null | { [key: string]: any } | string => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: null | { [key: string]: any } | string = jwt.decode(token);
  return result;
};
