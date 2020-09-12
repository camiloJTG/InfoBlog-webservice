import { getRepository } from 'typeorm';
import { ILabels, Labels } from '../models/label.model';

export const createLabel = async (label: ILabels): Promise<Labels> => {
  const newLabel = getRepository(Labels).create(label);
  const result = await getRepository(Labels).save(newLabel);
  return result;
};

export const getOneLabel = async (id: number | string): Promise<Labels> => {
  const getOne = await getRepository(Labels).findOne({ where: { ID: id } });
  if (getOne === undefined) {
    throw new Error(`The ${id} was not foud in the database`);
  }
  return getOne;
};

export const getAllLabel = async (): Promise<Labels[]> => {
  const result = await getRepository(Labels).find();
  if (result.length === 0) {
    throw new Error(`The label table is empty :C`);
  }
  return result;
};

export const updateLabel = async (
  id: number | string,
  label: ILabels
): Promise<Labels> => {
  const getOneLabel = await getRepository(Labels).findOne({
    where: { ID: id },
  });
  if (getOneLabel === undefined) {
    throw new Error(`The ${id} was not foud in the database`);
  }
  const newLabel = getRepository(Labels).merge(getOneLabel, label);
  const result = await getRepository(Labels).save(newLabel);
  return result;
};
