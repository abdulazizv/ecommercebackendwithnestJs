import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBranchesDto } from './dto/create-branches.dto';
import { UpdateBranchesDto } from './dto/update-branches.dto';

@Injectable()
export class BranchesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    const branches = await this.prismaService.branch.findMany({
      include: { products: true, workers: true },
    });
    if (!branches.length) {
      throw new BadRequestException('branches not found');
    }
    return branches;
  }

  async getOne(id: number) {
    const branch = await this.prismaService.branch.findUnique({
      where: { id: +id },
      include: { products: true, workers: true },
    });
    if (!branch) {
      throw new BadRequestException('branch not found');
    }
  }

  async create(branchBody: CreateBranchesDto) {
    const candidate = await this.prismaService.branch.findUnique({
      where: { name: branchBody.name },
    });
    if (candidate && candidate.marketId == +branchBody.marketId) {
      throw new BadRequestException(
        `${branchBody.name} nomli branch allaqachon mavjud`,
      );
    }
    const newBranch = await this.prismaService.branch.create({
      data: { ...branchBody },
    });
    return newBranch;
  }

  async update(id: number, branchBody: UpdateBranchesDto) {
    const branch = await this.prismaService.branch.findUnique({
      where: { id: +id },
    });
    if (!branch) {
      throw new BadRequestException('Bunday branch mavjud emas');
    }
    const updatedBranch = await this.prismaService.branch.update({
      where: { id: +id },
      data: {...branchBody},
    });
    return updatedBranch;
  }

  async delete(id: number) {
    const branch = await this.prismaService.branch.findUnique({
      where: { id: +id },
    });
    if (!branch) {
      throw new BadRequestException('Branch not found');
    }
    await this.prismaService.branch.delete({ where: { id: +id } });
    return { message: 'branch deleted', branch };
  }
}
