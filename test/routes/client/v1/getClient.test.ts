import { ParsedUrlQueryInput, stringify } from 'querystring';

import server from '../../../server.config';
import * as controllers from '../../../../src/controllers/client/v1';
import getClient from '../../../_stubs/client';

jest.mock('../../../../src/controllers/client/v1');

const controllerSpy = (controllers.getClient as jest.Mock).mockResolvedValue(getClient());

describe('GET /v1/client', () => {
  beforeEach(jest.clearAllMocks);

  const inject = async (query?: ParsedUrlQueryInput) => {
    const _query = query ? `?${stringify(query)}` : '';
    return server.inject({
      method: 'GET',
      url: `/v1/client${_query}`,
    });
  };

  test('success', async () => {
    const r = await inject({ accountId: 'cc4c8670-7c35-40a2-a279-a2933d7b165b' });

    expect(r.statusCode).toBe(200);
    expect(controllerSpy.mock.calls[0][0]).toHaveProperty('query', {
      accountId: 'cc4c8670-7c35-40a2-a279-a2933d7b165b',
    });
    expect(r.result).toStrictEqual(getClient());
  });
  test('without query', async () => {
    const r = await inject();

    expect(r.statusCode).toBe(400);
  });
  test('unexpected query', async () => {
    const r = await inject({ accountId: 'cc4c8670-7c35-40a2-a279-a2933d7b165b', age: 11 });

    expect(r.statusCode).toBe(400);
    expect(controllerSpy).toBeCalledTimes(0);
  });
});
