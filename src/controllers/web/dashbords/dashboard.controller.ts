import {
  UseGuards, Controller, Render,
  Req, Res, Body, Param, Get, Post,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticatedGuard } from '../../../middleware/auth.guard';

@UseGuards(AuthenticatedGuard)
@Controller('/dashbord/default')
export class webDashboardDefaultController {

  private path_view = "web/dashboards/";

  constructor() {}

  @Get()
  async list(@Res() res: Response, @Req() req: Request) {
    return res.render(this.path_view + "default", { user: req.user });
  }

}
