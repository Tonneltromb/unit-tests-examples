import { ServerRoute } from '@hapi/hapi';

import { ClientsService } from '../../../services/clients';

export const getClient: ServerRoute['handler'] = async (request) => {
  return await ClientsService.getOne();
};
