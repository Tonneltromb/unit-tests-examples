import ClientsService from '../../../src/services/clients';
import { runMock } from '../../../__mocks__/sqlite3';

jest.mock('sqlite3');

const update = ClientsService.update;

describe('update', () => {
  beforeEach(jest.clearAllMocks);

  test('update all props', async () => {
    const r = await update('account_id', {
      age: 1,
      nickname: 'new nick',
      firstName: 'new first name',
      secondName: 'new second name',
    });

    expect(r).toStrictEqual('account_id');
    expect(runMock).toBeCalledTimes(1);
    expect(runMock).toBeCalledWith(
      'UPDATE clients SET age = ?,nickname = ?,firstName = ?,secondName = ? WHERE accountId = ?',
      [1, 'new nick', 'new first name', 'new second name', 'account_id'],
      expect.any(Function)
    );
  });
  test('error', async () => {
    runMock.mockImplementationOnce((...args) => args[2](new Error('db error'), {}));

    const p = update('account_id', { age: 1 });

    await expect(p).rejects.toThrow('db error');
    expect(runMock).toBeCalled();
  });
});
