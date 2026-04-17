import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

class Database {
  constructor() {
    if (!Database.instance) {
      this.pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
      });

      Database.instance = this;
    }

    return Database.instance;
  }

  query(text, params) {
    return this.pool.query(text, params);
  }
}

const instance = new Database();
Object.freeze(instance);

export default instance;