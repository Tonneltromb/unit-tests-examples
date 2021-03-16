import { Client } from '../../src/models/Client';

const getClient = (): Client => {
  return {
    accountId: '09a1e2e4-da8e-4646-8f21-bc6a5a1dc5c6',
    firstName: 'John',
    secondName: 'Doe',
    nickname: 'john_doe1',
    age: 12,
  };
};

export default getClient;
