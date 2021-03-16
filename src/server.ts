import * as Hapi from '@hapi/hapi';
import * as Joi from 'joi';

import { registerRoutes } from './routes';

const start = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });

  server.validator(Joi);

  registerRoutes(server);

  await server.start();
};

export default start;
