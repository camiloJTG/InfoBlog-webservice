import { getRepository } from 'typeorm';
import { IRoles, Roles } from '../models/role.model';

export const createRole = async (role: IRoles): Promise<Roles> => {
  const roleExist = await getRepository(Roles).find({
    where: { NAME: role.NAME },
  });

  if (roleExist.length !== 0) {
    throw new Error(`The ${role.NAME} role name has already registered`);
  }

  const newRole = getRepository(Roles).create(role);
  const savedData = getRepository(Roles).save(newRole);
  return savedData;
};

export const getOneRole = async (id: number | string): Promise<Roles> => {
  const getRole = await getRepository(Roles).findOne({ where: { ID: id } });
  if (getRole === undefined) {
    throw new Error(`The ${id} was not foud in the database`);
  }
  return getRole;
};

export const getAllRoles = async (): Promise<Roles[]> => {
  const getAll = await getRepository(Roles).find();
  if (getAll.length === 0) {
    throw new Error(`The role table is empty :C`);
  }
  return getAll;
};

export const updateRole = async (
  id: number | string,
  roles: IRoles
): Promise<Roles> => {
  const getOneRole = await getRepository(Roles).findOne({
    where: { ID: id },
  });
  if (getOneRole === undefined) {
    throw new Error(`The ${id} was not foud in the database`);
  }
  const newRole = getRepository(Roles).merge(getOneRole, roles);
  const result = await getRepository(Roles).save(newRole);
  return result;
};
