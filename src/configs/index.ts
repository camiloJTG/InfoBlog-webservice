import app from './server';
import { config } from './config';
import { connection } from './connection';

const main = async () => {
  await connection();
  app.listen(config.environment.port);
  console.log(`Server on port ${config.environment.port}`);
};

main();
