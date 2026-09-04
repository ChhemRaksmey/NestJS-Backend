import {
  UseGuards, Controller, Render,
  Req, Res, Body, Param, Get, Post,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticatedGuard } from '../../../middleware/auth.guard';

@UseGuards(AuthenticatedGuard)
@Controller('/aml/lists/black')
export class SanctionBlacklistController {

  private path_view  = "web/aml/lists/black/";
  private path_route = "/aml/lists/black";
  private page_title = "Sanction Black-List";

  constructor() {}

  @Get()
  async page_list (@Res() res: Response, @Req() req: Request) {
    return res.render(this.path_view + "list", { user: req.user, path_route: this.path_route, page_title: this.page_title, });
  }

}
