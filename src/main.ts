import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import session = require('express-session');
import passport = require('passport');
import expressLayouts = require('express-ejs-layouts');
import connectPgSimple = require('connect-pg-simple');
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);

  // Static assets (css/js/images) served from /public
  app.useStaticAssets(join(process.cwd(), 'public'));

  // Views (EJS) served from src/resources/views
  app.setBaseViewsDir(join(process.cwd(), 'src/resources/views'));
  app.setViewEngine('ejs');
  app.use(expressLayouts);
  app.set('layout', 'layout');
  app.set('layout extractScripts', true);
  app.set('layout extractStyles', true);

  // Sessions + Passport (web user authentication)
  // Sessions are persisted in Postgres (table auto-created) instead of
  // in-memory, so they survive nodemon restarts in dev and app
  // restarts/redeploys in production — no more forced relogin on every
  // code change.
  const PgSession = connectPgSimple(session);
  app.use(
    session({
      store: new PgSession({
        conObject: {
          host: process.env.DB_HOST || 'localhost',
          port: parseInt(process.env.DB_PORT || '5432', 10),
          database: process.env.DB_DATABASE || 'db_backend',
          user: process.env.DB_USERNAME || 'postgres',
          password: process.env.DB_PASSWORD || '123456789',
        },
        tableName: 'session',
        createTableIfMissing: true,
      }),
      secret: config.get<string>('sessionSecret') || 'secret',
      resave: false,
      saveUninitialized: false,
      rolling: true, // reset the 10-min timer on every request
      cookie: { maxAge: 1000 * 60 * 5 }, // 10 minutes idle -> expires
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // Global validation for API DTOs
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );

  const port = config.get<number>('port') || 3000;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`🚀 App running at http://localhost:${port}`);
}

bootstrap();
