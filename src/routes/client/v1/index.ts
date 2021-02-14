import { ServerRoute } from '@hapi/hapi';

import * as clientControllers from '../../../controllers/client/v1';

export const clientRoutesV1: ServerRoute[] = [
  {
    method: 'GET',
    // path: prepareRoutePath('v1', 'clients'),
    path: '/v1/clients',
    handler: clientControllers.getClients,
  },
  {
    method: 'GET',
    // path: prepareRoutePath('v1', 'client'),
    path: '/v1/client',
    handler: clientControllers.getClient,
  },
  {
    method: 'POST',
    // path: prepareRoutePath('v1', 'client'),
    path: '/v1/client',
    handler: clientControllers.createClient,
  },
  {
    method: 'PUT',
    // path: prepareRoutePath('v1', 'client'),
    path: '/v1/client',
    handler: clientControllers.updateClient,
  },
  {
    method: 'DELETE',
    // path: prepareRoutePath('v1', 'client'),
    path: '/v1/client',
    handler: clientControllers.deleteClient,
  },
];
