import { ServerRoute, Request } from '@hapi/hapi';

import { ClientsService } from '../../../services/clients';
import { Client } from '../../../models/Client';

interface CreateClientRequest extends Request {
  payload: Omit<Client, 'accountId'>;
}

export const createClient: ServerRoute['handler'] = async (request: CreateClientRequest) => {
  return ClientsService.create(request.payload);
};
