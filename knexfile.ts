import type { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';

console.log("Knexfile")
console.log(process.env.POSTGRES_HOST);
console.log(process.env.POSTGRES_USER);

// Assuming these values are being correctly pulled from your .env file
const POSTGRES_HOST = process.env.POSTGRES_HOST; // This should be 'db' in Docker context
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_DB = process.env.POSTGRES_DB;
const POSTGRES_PORT = process.env.POSTGRES_PORT; // Default to 5432 if not specified

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      host: POSTGRES_HOST,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
      port: Number(POSTGRES_PORT), // Default PostgreSQL port
    },
    migrations: {
      tableName: 'migrations',
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './src/database/seeds',
    },
    ...knexSnakeCaseMappers(),
  },
};

export default config;
