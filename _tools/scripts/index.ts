const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('database.test');

export const runScript = (tableName: string, script: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    db.run(script, (error: Error | null) => {
      if (error) {
        reject(`${tableName} table creation error, ${error}`);
      } else {
        resolve(`${tableName} table created successfully`);
      }
    });
  });
};
