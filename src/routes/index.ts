import { Server } from '@hapi/hapi';

import { clientRoutesV1 } from './client/v1';

export const registerRoutes = (server: Server) => {
  server.route([...clientRoutesV1]);
};
