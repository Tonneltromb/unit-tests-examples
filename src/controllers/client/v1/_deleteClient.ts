import { Request, ServerRoute } from '@hapi/hapi';

import ClientsService from '../../../services/clients';
import { Client } from '../../../models/Client';

interface DeleteClientRequest extends Request {
  payload: {
    accountId: Client['accountId'];
  };
}

export const deleteClient: ServerRoute['handler'] = async (request: DeleteClientRequest) => {
  await ClientsService.delete(request.payload.accountId);
  return 'ok';
};
