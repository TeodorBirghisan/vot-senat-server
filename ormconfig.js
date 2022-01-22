module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['dist/modules/**/*.entity.{ts,js}'],
  migrationsTableName: 'migration_table',
  migrations: ['dist/migration/**/*.{ts,js}'],
  cli: {
    migrationsDir: 'src/migration',
  },
  ssl: process.env.MODE == 'PROD' ? { rejectUnauthorized: false } : false,
};
