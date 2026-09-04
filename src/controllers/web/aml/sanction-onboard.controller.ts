import {
  UseGuards, Controller, Render,
  Req, Res, Body, Param, Get, Post,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ProductService } from '../../../services/product.service';
import { AuthenticatedGuard } from '../../../middleware/auth.guard';

@UseGuards(AuthenticatedGuard)
@Controller('/aml/onboard')
export class SanctionOnBoardController {

  private path_view  = "web/aml/onboard/";
  private path_route = "/aml/onboard";
  private page_title = "Sanction OnBoard Checking";

  constructor(private readonly productService: ProductService) {}

  @Get()
  async page_list (@Res() res: Response, @Req() req: Request) {
    const products = await this.productService.findAll();
    return res.render(this.path_view + "list", { user: req.user, path_route: this.path_route, page_title: this.page_title, products, });
  }

}
