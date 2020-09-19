import { getRepository, createQueryBuilder } from 'typeorm';
import { IPosts, Posts } from '../models/post.model';
import {
  createImage,
  deleteImage,
  deleteImageDB,
  updateImage,
} from './image.service';

export const createPost = async (
  post: IPosts,
  localImage: string
): Promise<Posts> => {
  const image = await createImage(localImage);
  if (image === undefined) {
    throw new Error('An error occurred while uploading the image');
  }
  const newPost: IPosts = {
    TITLE: post.TITLE,
    DESCRIPTION: post.DESCRIPTION,
    USER: post.USER,
    IMAGE: image,
  };
  const createModel = getRepository(Posts).create(newPost);
  const result = await getRepository(Posts).save(createModel);
  return result;
};

export const getOnePost = async (
  id: number | string
): Promise<Posts | unknown> => {
  const getpost = await createQueryBuilder(Posts, 'post')
    .innerJoinAndSelect('post.IMAGE', 'IMAGE')
    .where(`post.ID = :id`, { id })
    .getOne();
  if (getpost == undefined) {
    throw new Error(`The ${id} was not foud in the database`);
  }
  return getpost;
};

export const getAllPost = async (): Promise<Posts[]> => {
  const getAll = await createQueryBuilder(Posts, 'post')
    .innerJoinAndSelect('post.IMAGE', 'IMAGE')
    .getMany();
  if (getAll.length === 0) {
    throw new Error(`The post table is empty`);
  }
  return getAll;
};

export const updatePost = async (
  id: string | number,
  post: IPosts,
  image: string | null
): Promise<Posts> => {
  let newImage;
  const postsExists = await createQueryBuilder(Posts, 'post')
    .innerJoinAndSelect('post.IMAGE', 'IMAGE')
    .where('post.ID = :id', { id })
    .getOne();
  if (postsExists === undefined) {
    throw new Error(`The ${id} was not foud in the database`);
  }

  if (image != null) {
    await deleteImage(
      [postsExists.IMAGE.REMOTE_ID],
      postsExists.IMAGE.LOCAL_URL
    );
    newImage = await updateImage(postsExists.IMAGE.ID, image);
  }
  if (newImage === undefined) {
    throw new Error(`An error occurred while uploading the image`);
  }
  const newPostAndImage = postsExists;
  newPostAndImage.IMAGE = newImage;
  const newRole = getRepository(Posts).merge(postsExists, post);
  const result = await getRepository(Posts).save(newRole);
  return result;
};

export const deletePost = async (
  id: number | string
): Promise<number | undefined | null> => {
  const postExists = await createQueryBuilder(Posts, 'post')
    .innerJoinAndSelect('post.IMAGE', 'IMAGE')
    .where(`post.ID = :id`, { id })
    .getOne();
  if (postExists == undefined) {
    throw new Error(`The post id '${id}' was not foud in the database`);
  }
  const result = await getRepository(Posts).delete(id);

  await deleteImageDB(
    [postExists.IMAGE.REMOTE_ID],
    postExists.IMAGE.LOCAL_URL,
    postExists.IMAGE.ID
  );

  return result.affected;
};
