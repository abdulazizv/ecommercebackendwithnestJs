import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    const products = await this.prismaService.product.findMany();
    if (!products.length) {
      throw new BadRequestException('product not found or table is empty');
    }
    return products;
  }

  async getOne(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id: +id },
    });
    if (!product) {
      throw new BadRequestException('product not found');
    }
    return product;
  }
  async create(productBody: CreateProductDto) {
    const candidate = await this.prismaService.product.findMany({
      where: { title: productBody.title, branchId: productBody.branchId },
    });
    console.log(candidate);
    if (candidate.length) {
      throw new BadRequestException(
        `${productBody.title} nomli product bu branchda allaqachon mavjud`,
      );
    }
    const newProduct = await this.prismaService.product.create({
      data: productBody,
    });
    return newProduct;
  }

  async update(id: number, productBody: UpdateProductDto) {
    const product = await this.prismaService.product.findUnique({
      where: { id: +id },
    });
    if (!product) {
      throw new BadRequestException('Bunday product mavjud emas');
    }
    const updatedProduct = await this.prismaService.product.update({
      where: { id: +id },
      data: { ...productBody },
    });
    return updatedProduct;
  }

  async delete(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id: +id },
    });
    if (!product) {
      throw new BadRequestException('product not found');
    }
    await this.prismaService.product.delete({ where: { id: +id } });
    return { message: 'product deleted', product };
  }
}
