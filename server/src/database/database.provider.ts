import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import * as dotenv from 'dotenv';
import { Users } from 'src/Model/Entities/user.entity';
import { Favorites } from 'src/Model/Entities/favorite.entity';
import { Reviews } from 'src/Model/Entities/review.entity';
dotenv.config();

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: process.env.DATABASE_DIALECT as Dialect,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT as unknown as number,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
      });
      sequelize.addModels([Users, Favorites, Reviews]);
      await sequelize.sync();
      //   await sequelize.sync({ force: true });
      return sequelize;
    },
  },
];
