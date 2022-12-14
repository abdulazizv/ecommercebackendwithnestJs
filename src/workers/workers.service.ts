import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkerDto } from './dto/create-workers.dto';
import { UpdateWorkerDto } from './dto/update-workers.dto';

@Injectable()
export class WorkersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    const workers = await this.prismaService.worker.findMany();
    if (!workers.length) {
      throw new BadRequestException('worker not found or table is empty');
    }
    return workers;
  }

  async getOne(id: number) {
    const worker = await this.prismaService.worker.findUnique({
      where: { id: +id },
    });
    if (!worker) {
      throw new BadRequestException('worker not found');
    }
    return worker;
  }
  async create(workerBody: CreateWorkerDto) {
    const candidate = await this.prismaService.worker.findMany({
      where: { ...workerBody },
    });
    if (candidate.length) {
      throw new BadRequestException(
        `${workerBody.name} nomli worker allaqachon mavjud`,
      );
    }
    const newWorker = await this.prismaService.worker.create({
      data: workerBody,
    });
    return newWorker;
  }

  async update(id: number, workerBody: UpdateWorkerDto) {
    const worker = await this.prismaService.worker.findUnique({
      where: { id: +id },
    });
    if (!worker) {
      throw new BadRequestException('Bunday worker mavjud emas');
    }
    const candidate = await this.prismaService.worker.findMany({
      where: { ...workerBody },
    });
    if (candidate.length && candidate[0].id != id) {
      throw new BadRequestException('Bunday malumotli hodim allaqachon bor');
    }
    const updatedWorker = await this.prismaService.worker.update({
      where: { id: +id },
      data: { ...workerBody },
    });
    return updatedWorker;
  }

  async delete(id: number) {
    const worker = await this.prismaService.worker.findUnique({
      where: { id: +id },
    });
    if (!worker) {
      throw new BadRequestException('worker not found');
    }
    await this.prismaService.worker.delete({ where: { id: +id } });
    return { message: 'worker deleted', worker };
  }
}
