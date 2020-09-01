import { createConnection, Connection } from 'typeorm';

export const connection = async (): Promise<string> => {
  const result: Connection = await createConnection();
  if (result.isConnected) {
    return 'database is connected';
  }
  throw new Error('Could not establish a connection to the database ');
};
