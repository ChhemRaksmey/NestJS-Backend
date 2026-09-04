import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { Product } from '../models/product.entity';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_DATABASE || 'db_backend',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '123456789',
    entities: [User, Product],
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    autoLoadEntities: true,
  }),
);
