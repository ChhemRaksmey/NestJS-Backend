import { User } from '../models/user.entity';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends Partial<import('../models/user.entity').User> {}
  }
}

declare module 'express-session' {
  interface SessionData {
    returnTo?: string;
    error?: string;
  }
}

export {};
