import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, TEST, DEVELOPMENT, PRODUCTION } from '../constants';
import { DATABASE_CONFIG } from './database.config';
import { User } from 'src/modules/user/user.entity';

export const DATABASE_PROVIDERS = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = DATABASE_CONFIG.development;
          break;
        case TEST:
          config = DATABASE_CONFIG.test;
          break;
        case PRODUCTION:
          config = DATABASE_CONFIG.production;
          break;
        default:
          config = DATABASE_CONFIG.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User]); //Add models here
      await sequelize.sync();
      return sequelize;
    },
  },
];
