import { getRepository } from 'typeorm';
import { IImage, Images } from '../models/images.model';
import { uploadFile, deleteFile } from '../apis/cloudinary';
import { unlink } from 'fs-extra';

export const createImage = async (localImage: string): Promise<Images> => {
  const saveFile = await uploadFile(localImage);
  const image: IImage = {
    LOCAL_URL: localImage,
    REMOTE_ID: saveFile.public_id,
    URL: saveFile.secure_url,
  };
  const newImage = getRepository(Images).create(image);
  const result = getRepository(Images).save(newImage);
  return result;
};

export const updateImage = async (
  id: string | number,
  localImage: string
): Promise<Images> => {
  const getOneImage = await getRepository(Images).findOne({
    where: { ID: id },
  });
  if (getOneImage === undefined) {
    throw new Error(`The ${id} was not foud in the database`);
  }

  const saveFile = await uploadFile(localImage);
  const image: IImage = {
    LOCAL_URL: localImage,
    REMOTE_ID: saveFile.public_id,
    URL: saveFile.secure_url,
  };
  const newImage = getRepository(Images).merge(getOneImage, image);
  const result = await getRepository(Images).save(newImage);
  return result;
};

export const deleteImage = async (
  remoteId: string[],
  localUrl: string
): Promise<boolean> => {
  await deleteFile(remoteId);
  await unlink(localUrl);
  return true;
};

export const deleteImageDB = async (
  remoteId: string[],
  localUrl: string,
  id: string | number
): Promise<number> => {
  const result = await getRepository(Images).delete(id);
  if (result.affected == undefined || null) {
    throw new Error(`The image id '${id}' was not foud in the database`);
  }
  await deleteFile(remoteId);
  await unlink(localUrl);
  return result.affected;
};
