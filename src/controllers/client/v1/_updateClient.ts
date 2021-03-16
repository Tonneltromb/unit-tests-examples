import { ServerRoute, Request } from '@hapi/hapi';

import ClientsService from '../../../services/clients';
import { Client } from '../../../models/Client';

interface UpdateClientRequest extends Request {
  payload: {
    accountId: Client['accountId'];
    updateData: Partial<Omit<Client, 'accountId'>>;
  };
}

export const updateClient: ServerRoute['handler'] = async (request: UpdateClientRequest) => {
  const { accountId, updateData } = request.payload;
  return ClientsService.update(accountId, updateData);
};
