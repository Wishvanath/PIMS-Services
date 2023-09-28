import { Sequelize } from 'sequelize';

import config from '../config/config';

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize('', '', '', {
  dialect: 'mysql',
  hooks: {
    beforeConnect: async (configuration: any) => {
      const c: any = await config();
      configuration.host = c[env].host;
      configuration.username = c[env].username;
      configuration.password = c[env].password;
      configuration.database = c[env].database;
    },
  },
  logging: true,
});

export { sequelize, Sequelize };
