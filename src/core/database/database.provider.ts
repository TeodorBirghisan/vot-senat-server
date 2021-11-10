import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, TEST, DEVELOPMENT, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from 'src/modules/user/user.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User]); //Add models here
      await sequelize.sync();
      return sequelize;
    },
  },
];
