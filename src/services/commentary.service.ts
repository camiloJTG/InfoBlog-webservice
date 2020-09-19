import { getRepository } from 'typeorm';
import { Comments, IComments } from '../models/commentary.model';
import { Posts } from '../models/post.model';
import { Users } from '../models/user.model';

export const createCommentary = async (
  commentary: IComments
): Promise<Comments> => {
  const postIdExists = await getRepository(Posts).findOne({
    where: { ID: commentary.POST },
  });
  if (postIdExists === undefined) {
    throw new Error(
      `The post id '${commentary.POST}' was not found in the database`
    );
  }

  const userIdExists = await getRepository(Users).findOne({
    where: { ID: commentary.USER },
  });
  if (userIdExists === undefined) {
    throw new Error(
      `The user id '${commentary.USER}' was not found in the database`
    );
  }

  const newCommentary = getRepository(Comments).create(commentary);
  const saveCommentary = await getRepository(Comments).save(newCommentary);
  return saveCommentary;
};

export const getAllCommentariesByUser = async (
  userId: number | string
): Promise<Comments[]> => {
  const result = await getRepository(Comments).find({
    where: { USER: userId },
  });
  if (result.length === 0) {
    throw new Error(`Not data in the database`);
  }
  return result;
};

export const getAllCommentariesByPost = async (
  postId: number | string
): Promise<Comments[]> => {
  const result = await getRepository(Comments).find({
    where: { POST: postId },
  });
  if (result.length === 0) {
    throw new Error(`NOt data in the database`);
  }
  return result;
};

export const getAllCommentariesByUserAndPost = async (
  postUser: IComments
): Promise<Comments[]> => {
  const result = await getRepository(Comments).find({
    where: { POST: postUser.POST, USER: postUser.USER },
  });

  if (result.length === 0) {
    throw new Error(`Not data in the database`);
  }
  return result;
};
