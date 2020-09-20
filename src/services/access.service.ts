import { getRepository } from 'typeorm';
import { sign, ILogin } from '../controllers/utils/jwt';
import { Users } from '../models/user.model';

export const accessLogin = async (login: ILogin): Promise<string> => {
  const result = await getRepository(Users).findOne({
    where: { MAIL: login.MAIL, PASSWORD: login.PASSWORD },
  });
  const generateToken = sign({
    MAIL: result?.MAIL,
    ROLE: result?.ROLE,
    USERNAME: result?.USERNAME,
  });
  return generateToken;
};
