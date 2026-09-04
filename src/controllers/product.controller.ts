import {
  UseGuards, Controller, Render,
  Req, Res, Body, Param, Get, Post,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { AuthenticatedGuard } from '../middleware/auth.guard';

@UseGuards(AuthenticatedGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @Render('products/list')
  async list(@Req() req: Request) {
    const products = await this.productService.findAll();
    return { title: 'Products', products, user: req.user };
  }

  @Get('create')
  @Render('products/create')
  createPage(@Req() req: Request) {
    return { title: 'Create Product', user: req.user, error: null };
  }

  @Post('create')
  async create(
    @Body() body: { name: string; description: string; price: string },
    @Res() res: Response,
  ) {
    await this.productService.create({
      name: body.name,
      description: body.description,
      price: parseFloat(body.price) || 0,
    });
    return res.redirect('/products');
  }

  @Get(':id')
  @Render('products/view')
  async view(@Param('id') id: string, @Req() req: Request) {
    const product = await this.productService.findOne(+id);
    return { title: 'Product Detail', product, user: req.user };
  }

  @Get(':id/edit')
  @Render('products/edit')
  async editPage(@Param('id') id: string, @Req() req: Request) {
    const product = await this.productService.findOne(+id);
    return { title: 'Edit Product', product, user: req.user, error: null };
  }

  @Post(':id/edit')
  async update(
    @Param('id') id: string,
    @Body() body: { name: string; description: string; price: string },
    @Res() res: Response,
  ) {
    await this.productService.update(+id, {
      name: body.name,
      description: body.description,
      price: parseFloat(body.price) || 0,
    });
    return res.redirect(`/products/${id}`);
  }

  @Post(':id/delete')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.productService.remove(+id);
    return res.redirect('/products');
  }
}
