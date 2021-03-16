import { ParsedUrlQueryInput, stringify } from 'querystring';

import server from '../../../server.config';
import * as controllers from '../../../../src/controllers/client/v1';
import getClient from '../../../_stubs/client';

jest.mock('../../../../src/controllers/client/v1');

const controllerSpy = (controllers.getClients as jest.Mock).mockResolvedValue([getClient()]);

describe('GET /v1/clients', () => {
  beforeEach(jest.clearAllMocks);

  const inject = async (query?: ParsedUrlQueryInput) => {
    const _query = query ? `?${stringify(query)}` : '';
    return server.inject({
      method: 'GET',
      url: `/v1/clients${_query}`,
    });
  };

  test('without query', async () => {
    const r = await inject();

    expect(r.statusCode).toBe(200);
    expect(controllerSpy.mock.calls[0][0]).toHaveProperty('query', {});
    expect(r.result).toStrictEqual([getClient()]);
  });
  test('with page', async () => {
    const r = await inject({ page: 2 });

    expect(r.statusCode).toBe(200);
    expect(controllerSpy.mock.calls[0][0]).toHaveProperty('query', { page: 2 });
    expect(r.result).toStrictEqual([getClient()]);
  });
  test('with size', async () => {
    const r = await inject({ size: 20 });

    expect(r.statusCode).toBe(200);
    expect(controllerSpy.mock.calls[0][0]).toHaveProperty('query', { size: 20 });
    expect(r.result).toStrictEqual([getClient()]);
  });
  test('unexpected query', async () => {
    const r = await inject({ age: 11 });

    expect(r.statusCode).toBe(400);
    expect(controllerSpy).toBeCalledTimes(0);
  });
});
