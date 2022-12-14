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
import { UserMiddleware } from '../middlewares/access.middlewares';
import { CreateWorkerDto } from './dto/create-workers.dto';
import { UpdateWorkerDto } from './dto/update-workers.dto';
import { WorkersService } from './workers.service';

@UseGuards(JwtAuthGuard)
@Controller('workers')
export class WorkersController {
  constructor(private readonly workerService: WorkersService) {}
  
  @Get()
  getAll() {
    return this.workerService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.workerService.getOne(id);
  }

  @Post()
  create(@Body() workerBody: CreateWorkerDto) {
    return this.workerService.create(workerBody);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() workerBody: UpdateWorkerDto) {
    return this.workerService.update(id, workerBody);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.workerService.delete(id);
  }
}
