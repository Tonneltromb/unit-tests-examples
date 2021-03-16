import ClientsService from '../../../src/services/clients';
import { runMock } from '../../../__mocks__/sqlite3';

jest.mock('sqlite3');

const _delete = ClientsService.delete;
describe('delete', () => {
  beforeEach(jest.clearAllMocks);

  test('success', async () => {
    const r = await _delete('account_id');

    expect(r).toBe(undefined);
    expect(runMock).toBeCalledTimes(1);
    expect(runMock).toBeCalledWith('DELETE from clients WHERE accountId = ?', ['account_id'], expect.any(Function));
  });
  test('error', async () => {
    runMock.mockImplementationOnce((...args) => args[2](new Error('db error'), {}));

    const p = _delete('account_id');

    await expect(p).rejects.toThrow('db error');
    expect(runMock).toBeCalled();
  });
});
