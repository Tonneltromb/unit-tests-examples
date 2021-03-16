import ClientsService from '../../../src/services/clients';
import { allMock } from '../../../__mocks__/sqlite3';

jest.mock('sqlite3');

const getList = ClientsService.getList;

describe('getList', () => {
  beforeEach(jest.clearAllMocks);

  test('success', async () => {
    const r = await getList();

    expect(r).toStrictEqual([]);
    expect(allMock).toBeCalledTimes(1);
    expect(allMock).toBeCalledWith('SELECT * from clients LIMIT 10 OFFSET 1', expect.any(Function));
  });
  test('take 20', async () => {
    const r = await getList({ size: 20 });

    expect(r).toStrictEqual([]);
    expect(allMock).toBeCalledTimes(1);
    expect(allMock).toBeCalledWith('SELECT * from clients LIMIT 20 OFFSET 1', expect.any(Function));
  });
  test('take from 2 page', async () => {
    const r = await getList({ page: 2 });

    expect(r).toStrictEqual([]);
    expect(allMock).toBeCalledTimes(1);
    expect(allMock).toBeCalledWith('SELECT * from clients LIMIT 10 OFFSET 2', expect.any(Function));
  });
  test('take 20 from 2 page', async () => {
    const r = await getList({ page: 2, size: 20 });

    expect(r).toStrictEqual([]);
    expect(allMock).toBeCalledTimes(1);
    expect(allMock).toBeCalledWith('SELECT * from clients LIMIT 20 OFFSET 2', expect.any(Function));
  });
  test('error', async () => {
    allMock.mockImplementationOnce((...args) => args[1](new Error('db error'), {}));

    const p = getList();

    await expect(p).rejects.toThrow('db error');
    expect(allMock).toBeCalled();
  });
});
