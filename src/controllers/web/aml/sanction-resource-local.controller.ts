import {
  UseGuards, Controller, Render,
  Req, Res, Body, Param, Get, Post,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ProductService } from '../../../services/product.service';
import { AuthenticatedGuard } from '../../../middleware/auth.guard';

@UseGuards(AuthenticatedGuard)
@Controller('/aml/sanction/resources/local')
export class SanctionResourceLocalController {

  private path_view  = "web/aml/sanction/resources/local/";
  private path_route = "/aml/sanction/resources/local";
  private page_title = "Sanction Resources Local";

  constructor(private readonly productService: ProductService) {}

  @Get()
  async page_list (@Res() res: Response, @Req() req: Request) {
    const products = await this.productService.findAll();
    return res.render(this.path_view + "list", { user: req.user, path_route: this.path_route, page_title: this.page_title, products, });
  }

  @Get('create')
  async page_create (@Res() res: Response, @Req() req: Request) {
    return res.render(this.path_view + "create", { user: req.user, path_route: this.path_route, page_title: this.page_title, });
  }

  @Get(':id/edit')
  async page_edit (@Res() res: Response, @Req() req: Request, @Param('id') id: string) {
    return res.render(this.path_view + "edit", { user: req.user, path_route: this.path_route, page_title: this.page_title, id: id });
  }

  @Get(':id/view')
  async page_view (@Res() res: Response, @Req() req: Request, @Param('id') id: string) {
    return res.render(this.path_view + "view", { user: req.user, path_route: this.path_route, page_title: this.page_title, id: id });
  }

  @Get(':id/authorize')
  async page_authorize (@Res() res: Response, @Req() req: Request, @Param('id') id: string) {
    return res.render(this.path_view + "authorize", { user: req.user, path_route: this.path_route, page_title: this.page_title, id: id });
  }



  @Post('create')
  async save_create (@Res() res: Response, @Req() req: Request, @Param('id') id: string) {
    return res.redirect(this.path_route);
  }

  @Post(':id/edit')
  async save_edit (@Res() res: Response, @Req() req: Request, @Param('id') id: string) {
    return res.redirect(this.path_route + "/" + id + "/view");
  }

  @Post(':id/view')
  async save_view (@Res() res: Response, @Req() req: Request, @Param('id') id: string) {
    return res.redirect(this.path_route);
  }

  @Post(':id/authorize')
  async save_authorize (@Res() res: Response, @Req() req: Request, @Param('id') id: string) {
    return res.redirect(this.path_route);
  }


}
