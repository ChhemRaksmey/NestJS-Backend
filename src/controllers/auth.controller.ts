import {
  UseGuards, Controller, Render,
  Body, Get, Post,
  Req, Res, Next,
} from '@nestjs/common';
import passport = require('passport');
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { GuestGuard } from '../middleware/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GuestGuard)
  @Get('login')
  @Render('auth/login')
  loginPage(@Req() req: Request) {
    return {
      title: 'Login',
      error: req.session['error'] || null,
    };
  }

  @UseGuards(GuestGuard)
  @Post('login')
  login(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    passport.authenticate('local', (err: any, user: any) => {
      if (err || !user) {
        return res.render('auth/login', {
          title: 'Login',
          error: 'Invalid email or password',
        });
      }
      req.logIn(user, (loginErr) => {
        if (loginErr) return next(loginErr);

        const returnTo = req.session['returnTo'] || '/dashbord/default';
        delete req.session['returnTo'];
        
        return res.redirect(returnTo);
      });
    })(req, res, next);
  }

  @UseGuards(GuestGuard)
  @Get('register')
  @Render('auth/register')
  registerPage() {
    return { title: 'Register', error: null };
  }

  @UseGuards(GuestGuard)
  @Post('register')
  async register(
    @Body() body: { name: string; email: string; password: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.userService.create(body);
      return res.redirect('/auth/login');
    } catch (err: any) {
      return res.render('auth/register', {
        title: 'Register',
        error: err.message || 'Registration failed',
      });
    }
  }

  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout(() => {
      req.session.destroy(() => {
        res.redirect('/auth/login');
      });
    });
  }

}
