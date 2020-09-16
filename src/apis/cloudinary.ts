import { ResponseCallback, UploadApiResponse, v2 } from 'cloudinary';
import { config } from '../configs/config';

v2.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.key,
  api_secret: config.cloudinary.apiSecret,
  secure: config.cloudinary.secure,
});

export const uploadFile = async (file: string): Promise<UploadApiResponse> => {
  const result = await v2.uploader.upload(file, {
    folder: 'InfoBlog/Posts',
  });
  return result;
};

export const deleteFile = async (
  publicId: string[]
): Promise<ResponseCallback | undefined> => {
  const result = await v2.api.delete_resources(publicId);
  return result;
};
