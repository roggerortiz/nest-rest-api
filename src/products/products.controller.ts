import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) { }

  @Get()
  async getAll(): Promise<Product[]> {
    const products: Product[] = await this.productService.findAll();
    return products;
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const product: Product | null = await this.productService.findById(id);
    return product;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() createCatDto: CreateProductDto) {
    const product: Product | null = await this.productService.update(id, createCatDto);
    return product;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createCatDto: CreateProductDto) {
    const product: Product = await this.productService.create(createCatDto);
    return product;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const product: Product | null = await this.productService.delete(id);
    return product;
  }
}
