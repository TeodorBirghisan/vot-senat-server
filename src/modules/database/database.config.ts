import * as dotenv from 'dotenv';
import {
  IDatabaseConfig,
  IDatabaseConfigAttributes,
} from 'src/modules/database/database-config.interface';

dotenv.config();

const DATABASE_CONFIG_MAP: IDatabaseConfig = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_DEVELOPMENT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    type: process.env.DB_TYPE,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    type: process.env.DB_TYPE,
  },
  production: {
    username: process.env.DB_USER_PRODUCTION,
    password: process.env.DB_PASS_PRODUCTION,
    database: process.env.DB_NAME_PRODUCTION,
    host: process.env.DB_HOST_PRODUCTION,
    port: process.env.DB_PORT_PRODUCTION,
    type: process.env.DB_TYPE,
  },
};

export const DATABASE_CONFIG: IDatabaseConfigAttributes =
  DATABASE_CONFIG_MAP[process.env.ACTIVE_PROFILE];
