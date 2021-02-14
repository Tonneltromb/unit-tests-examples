import { Server } from '@hapi/hapi';

import { clientRoutesV1 } from './client/v1';

type ApiVersionPrefix = '' | 'v1';

type ApiEntityPrefix = '' | 'clients' | 'client';

export const registerRoutes = (server: Server) => {
  server.route([...clientRoutesV1]);
};

export const prepareRoutePath = (version: ApiVersionPrefix, entity: ApiEntityPrefix, path: string = '') => {
  const processedPathArg = path.trim() ? `/${path.trim()}` : '';
  return `${version}/${entity}${processedPathArg}`;
};
