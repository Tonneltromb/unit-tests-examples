import { Request } from '@hapi/hapi';

import ClientsService from '../../../services/clients';
import { WithPagination } from '../../../common/interfaces/pagination';

export interface GetClientsRequest extends Request {
  query: WithPagination;
}

export const getClients = async (request: GetClientsRequest) => {
  return ClientsService.getList(request.query);
};
