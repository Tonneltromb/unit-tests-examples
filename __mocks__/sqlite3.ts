export const runMock = jest.fn().mockImplementation((...args) => args[args.length - 1](null));
export const getMock = jest.fn().mockImplementation((...args) => args[args.length - 1](null, {}));
export const allMock = jest.fn().mockImplementation((...args) => args[args.length - 1](null, []));
class Database {
  run = runMock;
  get = getMock;
  all = allMock;
}
export const verbose = () => ({
  Database,
});
