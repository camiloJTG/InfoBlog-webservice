import { getRepository } from 'typeorm';
import { IPostLabel, PostLabel } from '../models/postLabel.model';

export const createPostLabel = async (
  postLabel: IPostLabel
): Promise<PostLabel> => {
  const result = getRepository(PostLabel).create(postLabel);
  const newPostLabel = await getRepository(PostLabel).save(result);
  return newPostLabel;
};

export const getOnePostLabel = async (postId: number): Promise<PostLabel> => {
  const result = await getRepository(PostLabel).findOne({
    where: { POST: postId },
  });

  if (result === undefined) {
    throw new Error(`The id '${postId}' was not foun in the database`);
  }

  return result;
};

export const deletePostLabel = async (
  postId: number
): Promise<number | null> => {
  const result = await getRepository(PostLabel).delete(postId);
  if (result.affected === undefined || null) {
    throw new Error(`An error has occurred when removing`);
  }
  return result.affected;
};
