import ClientsService from '../../../src/services/clients';
import { getMock } from '../../../__mocks__/sqlite3';
import getClient from '../../_stubs/client';

jest.mock('sqlite3');

const getOne = ClientsService.getOne;

describe('getOne', () => {
  beforeEach(jest.clearAllMocks);

  test('success', async () => {
    getMock.mockImplementationOnce((...args) => args[2](null, getClient()));

    const r = await getOne('123');

    expect(r).toStrictEqual(getClient());
    expect(getMock).toBeCalledTimes(1);
    expect(getMock).toBeCalledWith('SELECT * from clients WHERE accountId = ?', ['123'], expect.any(Function));
  });
  test('error', async () => {
    getMock.mockImplementationOnce((...args) => args[2](new Error('db error'), {}));

    const p = getOne('123');

    await expect(p).rejects.toThrow('db error');
    expect(getMock).toBeCalledTimes(1);
  });
});
