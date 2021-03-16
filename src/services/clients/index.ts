import { verbose } from 'sqlite3';
import { v4 as uuidv4 } from 'uuid';

const sqlite = verbose();
const db = new sqlite.Database('database.test');

import { Client } from '../../models/Client';
import { WithPagination } from '../../common/interfaces/pagination';

const GET_ONE = 'SELECT * from clients WHERE accountId = ?';
const GET_LIST = 'SELECT * from clients';
const CREATE = 'INSERT INTO clients VALUES($accountId, $firstName, $secondName, $nickname, $age)';
const UPDATE = (updateDataString: string) => `UPDATE clients SET ${updateDataString} WHERE accountId = ?`;
const DELETE = `DELETE from clients WHERE accountId = ?`;

const rejectIfError = (error: Error | null, reject: (reason: Error | null) => void) => {
  if (error) {
    console.error(error);
    reject(error);
  }
};

const ClientsService = {
  getOne: async (accountId: string): Promise<Client | null> => {
    return new Promise((resolve, reject) => {
      db.get(GET_ONE, [accountId], (error: Error | null, row: Client) => {
        rejectIfError(error, reject);
        resolve(row || null);
      });
    });
  },
  getList: async (query?: WithPagination): Promise<Client[]> => {
    const { page = 0, size = 10 } = query || {};
    let _preparedQuery = GET_LIST;
    _preparedQuery += ` LIMIT ${size} OFFSET ${page * size}`;
    return new Promise((resolve, reject) => {
      db.all(_preparedQuery, (error: Error | null, row: Client[]) => {
        rejectIfError(error, reject);
        resolve(row);
      });
    });
  },
  create: async (params: Omit<Client, 'accountId'>): Promise<Client['accountId']> => {
    const { firstName, secondName, nickname, age } = params;
    const accountId = uuidv4();
    return new Promise((resolve, reject) => {
      db.run(
        CREATE,
        {
          $accountId: accountId,
          $firstName: firstName,
          $secondName: secondName,
          $nickname: nickname,
          $age: age,
        },
        (error: Error | null) => {
          rejectIfError(error, reject);
          resolve(accountId);
        }
      );
    });
  },
  update: async (accountId: Client['accountId'], updateData: Partial<Omit<Client, 'accountId'>>): Promise<string> => {
    const updateDataString = Object.keys(updateData)
      .map((k) => `${k} = ?`)
      .join(',');
    const updateValues = Object.values(updateData);
    return new Promise((resolve, reject) => {
      db.run(UPDATE(updateDataString), [...updateValues, accountId], (error: Error | null) => {
        rejectIfError(error, reject);
        resolve(accountId);
      });
    });
  },
  delete: async (accountId: Client['accountId']): Promise<void> => {
    return new Promise((resolve, reject) => {
      db.run(DELETE, [accountId], (error: Error | null) => {
        rejectIfError(error, reject);
        resolve();
      });
    });
  },
};

export default ClientsService;
