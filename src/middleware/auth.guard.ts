import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (request.isAuthenticated && request.isAuthenticated()) {
      return true;
    }
    request.session.returnTo = request.originalUrl;
    request.res.redirect('/auth/login');
    return false;
  }
}

@Injectable()
export class GuestGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (request.isAuthenticated && request.isAuthenticated()) {
      request.res.redirect('/dashbord/default');
      return false;
    }
    return true;
  }
}
