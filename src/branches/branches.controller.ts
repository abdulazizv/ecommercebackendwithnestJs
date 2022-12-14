import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/user.guard';
import { BranchesService } from './branches.service';
import { CreateBranchesDto } from './dto/create-branches.dto';
import { UpdateBranchesDto } from './dto/update-branches.dto';

@UseGuards(JwtAuthGuard)
@Controller('branches')
export class BranchesController {
  constructor(private readonly branchService: BranchesService) {}

  @Get()
  getAll() {
    return this.branchService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.branchService.getOne(id);
  }

  @Post()
  create(@Body() branchBody: CreateBranchesDto) {
    return this.branchService.create(branchBody);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() branchBody: UpdateBranchesDto) {
    return this.branchService.update(id, branchBody);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.branchService.delete(id);
  }
}
