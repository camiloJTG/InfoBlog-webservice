import bcrypt from 'bcrypt';

const generateSalt = async () => {
  const salt = await bcrypt.genSalt(10);
  return salt.toString();
};

export const generateHash = async (password: string): Promise<string> => {
  const salt = await generateSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const compare = async (
  textPlanePassword: string,
  hashPassword: string
): Promise<boolean> => {
  const compare = await bcrypt.compare(textPlanePassword, hashPassword);
  return compare;
};
