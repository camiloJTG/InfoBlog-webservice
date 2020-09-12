import { getRepository } from 'typeorm';
import { IUsers, Users } from '../models/user.model';
import { generateHash } from '../controllers/utils/bcrypt';

export const createUser = async (
  user: IUsers,
  roleId: number
): Promise<Users> => {
  const mailExists = await getRepository(Users).find({
    where: { MAIL: user.MAIL },
  });
  if (mailExists.length !== 0) {
    throw new Error(`The mail ${user.MAIL} has already registered`);
  }

  const usernameExist = await getRepository(Users).find({
    where: { USERNAME: user.USERNAME },
  });
  if (usernameExist.length !== 0) {
    throw new Error(`The username ${user.USERNAME} has already registered`);
  }

  const passwordEncrypt = await generateHash(user.PASSWORD);
  user.PASSWORD = passwordEncrypt;
  user.ROLE = roleId;
  const newUser = getRepository(Users).create(user);
  const saveUser = await getRepository(Users).save(newUser);
  return saveUser;
};

export const getOneUser = async (id: number | string): Promise<Users> => {
  const getUser = await getRepository(Users).findOne({
    where: { ID: id },
    loadRelationIds: true,
  });
  if (getUser === undefined) {
    throw new Error(`The ${id} was not foud in the database`);
  }
  return getUser;
};

export const getAllUsers = async (): Promise<Users[]> => {
  const getAll = await getRepository(Users).find({ loadRelationIds: true });
  if (getAll.length === 0) {
    throw new Error(`The user table is empty :C`);
  }
  return getAll;
};

export const updateUser = async (
  id: number | string,
  users: Users
): Promise<Users> => {
  const getOneuser = await getRepository(Users).findOne({
    where: { ID: id },
  });
  if (getOneuser === undefined) {
    throw new Error(`The ${id} was not foud in the database`);
  }

  if (users.PASSWORD) {
    const passwordEncrypt = await generateHash(users.PASSWORD);
    users.PASSWORD = passwordEncrypt;
  }

  if (users.MAIL) {
    const mailExists = await getRepository(Users).find({
      where: { MAIL: users.MAIL },
    });
    if (mailExists.length !== 0) {
      throw new Error(`The ${users.MAIL} mail has already registered`);
    }
  }

  if (users.USERNAME) {
    const usernameExist = await getRepository(Users).find({
      where: { USERNAME: users.USERNAME },
    });
    if (usernameExist.length !== 0) {
      throw new Error(`The ${users.USERNAME} username has already registered`);
    }
  }

  const newUser = getRepository(Users).merge(getOneuser, users);
  const result = await getRepository(Users).save(newUser);
  return result;
};
