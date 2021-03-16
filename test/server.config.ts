import * as Hapi from '@hapi/hapi';
import * as Joi from 'joi';

import { registerRoutes } from '../src/routes';

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
});

server.validator(Joi);
registerRoutes(server);

export default server;
