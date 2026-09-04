import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { ProductService } from '../../services/product.service';
import { successResponse } from '../../utils/response.util';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@Controller('api/products')
export class ProductApiController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll() {
    const products = await this.productService.findAll();
    return successResponse(products, 'Product list retrieved');
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(+id);
    return successResponse(product, 'Product retrieved');
  }

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateProductDto) {
    const product = await this.productService.create(dto);
    return successResponse(product, 'Product created');
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    const product = await this.productService.update(+id, dto);
    return successResponse(product, 'Product updated');
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productService.remove(+id);
    return successResponse(null, 'Product deleted');
  }
}
