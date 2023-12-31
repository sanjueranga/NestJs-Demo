import {
    ForbiddenException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { ConfigService } from '@nestjs/config';
  import { PrismaService } from 'src/prisma/prisma.service';
  import { ProductDto } from './dto';
  import { EditProductDto } from './dto';
  
  @Injectable()
  export class ProductService {
    constructor(
      private prisma: PrismaService,
      private config: ConfigService
    ) {}
  
    async createProduct(dto: ProductDto) {
        const product = await this.prisma.product.create({
          data: {
            name: dto.name,
            description: dto.description,
            price: dto.price,
          },
        });
  
        return product;
  
      
    
    }
  
    async getAllProducts() {
      return this.prisma.product.findMany();
    }
  
    async findProductById(id: number) {
      const product = await this.prisma.product.findUnique({
        where: { id },
      });
  
      if (!product) {
        throw new NotFoundException('Product not found');
      }
  
      return product;
    }
  
    async editProduct(id: number, dto: EditProductDto) {
     
        const product = await this.prisma.product.update({
          where: { id },
          data: {
            name: dto.name,
            description: dto.description,
            price: dto.price,
          },
        });
  
        return product;
      }
  
    async deleteProduct(id: number) {
      const product = await this.prisma.product.findUnique({
        where: { id },
      });
  
      if (!product) {
        throw new NotFoundException('Product not found');
      }
  
      await this.prisma.product.delete({
        where: { id },
      });
  
      return product;
    }
  }
  