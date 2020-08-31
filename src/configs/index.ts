import app from './server';
import { config } from './config';

const main = () => {
  app.listen(config.environment.port);
  console.log(`Server on port ${config.environment.port}`);
};

main();
