import { ServerRoute, Request } from '@hapi/hapi';

import ClientsService from '../../../services/clients';

interface GetClientRequest extends Request {
  query: {
    accountId: string;
  };
}

export const getClient: ServerRoute['handler'] = async (request: GetClientRequest) => {
  return ClientsService.getOne(request.query.accountId);
};
