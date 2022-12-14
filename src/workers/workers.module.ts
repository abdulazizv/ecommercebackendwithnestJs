import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserMiddleware } from '../middlewares/access.middlewares';
import { PrismaModule } from '../prisma/prisma.module';
import { WorkersController } from './workers.controller';
import { WorkersService } from './workers.service';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [WorkersController],
  providers: [WorkersService],
})
export class WorkersModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(UserMiddleware).forRoutes(WorkersController);
  // }
}
