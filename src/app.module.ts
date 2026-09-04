import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { LoggerMiddleware } from './middleware/logger.middleware';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';

import route_controllers from './routes/controller';
import route_providers from './routes/providers';
import route_models from './routes/models';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('database'),
    }),
    TypeOrmModule.forFeature(route_models),
    PassportModule.register({ session: true }),
  ],
  controllers: route_controllers,
  providers: route_providers,
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
