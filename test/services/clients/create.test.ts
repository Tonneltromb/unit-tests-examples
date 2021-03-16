import ClientsService from '../../../src/services/clients';
import { runMock } from '../../../__mocks__/sqlite3';
import { v4 as uuidV4Mock } from '../../../__mocks__/uuid';

jest.mock('uuid');
jest.mock('sqlite3');

const create = ClientsService.create;
describe('create', () => {
  beforeEach(jest.clearAllMocks);
  test('success', async () => {
    const r = await create({ firstName: 'test user', secondName: 'test user', nickname: 'nick', age: 12 });

    expect(r).toBe('generated-uuid');
    expect(uuidV4Mock).toBeCalledTimes(1);
    expect(uuidV4Mock).toBeCalledWith();
    expect(runMock).toBeCalledTimes(1);
    expect(runMock).toBeCalledWith(
      'INSERT INTO clients VALUES($accountId, $firstName, $secondName, $nickname, $age)',
      {
        $accountId: 'generated-uuid',
        $age: 12,
        $firstName: 'test user',
        $nickname: 'nick',
        $secondName: 'test user',
      },
      expect.any(Function)
    );
  });
  test('error', async () => {
    runMock.mockImplementationOnce((query: string, params: {}, callback: (error: Error | null) => void) =>
      callback(new Error('db error'))
    );

    const p = create({ firstName: 'test user', secondName: 'test user', nickname: 'nick', age: 12 });

    await expect(p).rejects.toThrow('db error');
    expect(uuidV4Mock).toBeCalled();
    expect(runMock).toBeCalled();
  });
});
