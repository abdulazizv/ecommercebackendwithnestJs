import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMarketDto } from './dto/create-markets.dto';

@Injectable()
export class MarketsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    const markets = await this.prismaService.market.findMany({
      include: { branches: { include: { products: true, workers: true } } },
    });
    if (!markets.length) {
      throw new BadRequestException('Market not found or table is empty');
    }
    return markets;
  }

  async getOne(id: number) {
    const market = await this.prismaService.market.findUnique({
      where: { id: +id },
      include: { branches: { include: { products: true, workers: true } } },
    });
    if (!market) {
      throw new BadRequestException('Market not found');
    }
    return market;
  }
  async create(marketBody: CreateMarketDto) {
    const candidate = await this.prismaService.market.findUnique({
      where: { name: marketBody.name },
    });
    if (candidate) {
      throw new BadRequestException(
        `${marketBody.name} nomli Market allaqachon mavjud`,
      );
    }
    const newMarket = await this.prismaService.market.create({
      data: marketBody,
    });
    return newMarket;
  }

  async update(id: number, marketBody: CreateMarketDto) {
    const Market = await this.prismaService.market.findUnique({
      where: { id: +id },
    });
    if (!Market) {
      throw new BadRequestException('Bunday Market mavjud emas');
    }
    const updatedMarket = await this.prismaService.market.update({
      where: { id: +id },
      data: marketBody,
    });
    return updatedMarket;
  }

  async delete(id: number) {
    const market = await this.prismaService.market.findUnique({
      where: { id: +id },
    });
    if (!market) {
      throw new BadRequestException('Market not found');
    }
    await this.prismaService.market.delete({ where: { id: +id } });
    return { message: 'Market deleted', market };
  }
}
