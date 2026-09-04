import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../models/product.entity';

export interface ProductInput {
  name: string;
  description?: string;
  price: number;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: ProductInput): Promise<Product> {
    const product = this.productRepository.create(data);
    return this.productRepository.save(product);
  }

  async update(id: number, data: Partial<ProductInput>): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, data);
    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }
}
