export default () => ({
  port: parseInt(process.env.APP_PORT || '3000', 10),
  name: process.env.APP_NAME || 'NestJS CRUD App',
  sessionSecret: process.env.SESSION_SECRET || 'secret',
});
