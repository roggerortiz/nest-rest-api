import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) { }

  async findAll(): Promise<Product[]> {
    return this.productModel.find();
  }

  async findById(id: string): Promise<Product | null> {
    return this.productModel.findById(id);
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async update(id: string, createProductDto: CreateProductDto): Promise<Product | null> {
    return this.productModel.findByIdAndUpdate(id, createProductDto, { new: true });
  }

  async delete(id: string): Promise<Product | null> {
    return this.productModel.findByIdAndDelete(id);
  }
}
