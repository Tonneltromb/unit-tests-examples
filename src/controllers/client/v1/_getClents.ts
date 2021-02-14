import { ServerRoute } from '@hapi/hapi';
import { ClientsService } from '../../../services/clients';

export const getClients: ServerRoute['handler'] = async (request) => {
  return ClientsService.getList();
};
