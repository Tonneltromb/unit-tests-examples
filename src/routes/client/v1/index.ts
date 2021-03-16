import { ServerRoute } from '@hapi/hapi';

import * as clientControllers from '../../../controllers/client/v1';
import { prepareRoutePath } from '../../helpers';
import * as options from './options';

export const clientRoutesV1: ServerRoute[] = [
  {
    method: 'GET',
    path: prepareRoutePath('v1', 'clients'),
    handler: clientControllers.getClients,
    options: options.getClients,
  },
  {
    method: 'GET',
    path: prepareRoutePath('v1', 'client'),
    handler: clientControllers.getClient,
    options: options.getClient,
  },
  {
    method: 'POST',
    path: prepareRoutePath('v1', 'client'),
    handler: clientControllers.createClient,
  },
  {
    method: 'PUT',
    path: prepareRoutePath('v1', 'client'),
    handler: clientControllers.updateClient,
  },
  {
    method: 'DELETE',
    path: prepareRoutePath('v1', 'client'),
    handler: clientControllers.deleteClient,
  },
];
