import * as controllers from '../../../../src/controllers/client/v1';
import { GetClientsRequest } from '../../../../src/controllers/client/v1/_getClents';
import ClientsService from '../../../../src/services/clients';

jest.mock('../../../../src/services/clients');

const controller = controllers.getClients;
const getListSpy = jest.spyOn(ClientsService, 'getList').mockResolvedValue([]);

describe('getClients', () => {
  beforeEach(jest.clearAllMocks);

  test('success', async () => {
    const r = await controller(generateRequest());

    expect(r).toStrictEqual([]);
    expect(getListSpy).toBeCalledTimes(1);
    expect(getListSpy).toBeCalledWith(undefined);
  });
  test('with pagination', async () => {
    const r = await controller(generateRequest({ page: 2, size: 15 }));

    expect(r).toStrictEqual([]);
    expect(getListSpy).toBeCalledTimes(1);
    expect(getListSpy).toBeCalledWith({ page: 2, size: 15 });
  });

  const generateRequest = (query?: GetClientsRequest['query']): GetClientsRequest => {
    return {
      query,
    } as any;
  };
});
