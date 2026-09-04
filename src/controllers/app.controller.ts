import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  @Get()
  index(@Req() req: Request, @Res() res: Response) {
    if (req.isAuthenticated && req.isAuthenticated()) {
      return res.redirect('/products');
    }
    return res.redirect('/auth/login');
  }
}
