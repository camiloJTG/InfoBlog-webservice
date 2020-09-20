import jwt, { Secret } from 'jsonwebtoken';
import { config } from '../../configs/config';

const secret: Secret = config.jwt.secretKey;

export interface IToken {
  USERNAME?: string;
  MAIL?: string;
  ROLE?: number;
}

export interface ILogin {
  MAIL: string;
  PASSWORD: string;
}

export const sign = (payload: IToken): string => {
  const token = jwt.sign(payload, secret, {
    expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
  });
  return token;
};

export const verify = (
  token: string
  // eslint-disable-next-line @typescript-eslint/ban-types
): string | undefined | IToken => {
  const result = jwt.verify(token, secret);
  if (typeof result === 'string') {
    return result;
  }
  if (typeof result === 'object') {
    const data: IToken = new Object(result);
    return data;
  }
};
