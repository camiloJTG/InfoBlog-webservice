import { getRepository } from 'typeorm';
import { sign, ILogin } from '../controllers/utils/jwt';
import { Users } from '../models/user.model';
import { compare } from '../controllers/utils/bcrypt';

export const accessLogin = async (login: ILogin): Promise<string> => {
  const result = await getRepository(Users).findOne({
    where: { MAIL: login.MAIL },
  });
  if (result === undefined) {
    throw new Error(`Invalid credentials`);
  }

  const comparePassword = await compare(login.PASSWORD, result?.PASSWORD);

  if (!comparePassword) {
    throw new Error(`Invalid credentials`);
  }

  const generateToken = sign({
    MAIL: result?.MAIL,
    ROLE: result?.ROLE,
    USERNAME: result?.USERNAME,
  });
  return generateToken;
};
