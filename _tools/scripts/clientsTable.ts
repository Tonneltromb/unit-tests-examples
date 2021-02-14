import { runScript } from './index';

const CREATE_CLIENTS_TABLE_SCRIPT = `CREATE TABLE IF NOT EXISTS clients
                                     (
                                       accountId  TEXT PRIMARY KEY,
                                       firstName  TEXT,
                                       secondName TEXT,
                                       nickname   TEXT,
                                       age        INTEGER
                                     );`;

const DROP_CLIENTS_TABLE_SCRIPT = `DROP TABLE IF EXISTS clients`;

export const createTable = async () => {
  await runScript('clients', CREATE_CLIENTS_TABLE_SCRIPT);
};
export const dropTable = async () => {
  await runScript('clients', DROP_CLIENTS_TABLE_SCRIPT);
};

// dropTable().then(createTable);
