import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MarketsModule } from './markets/markets.module';
import { BranchesModule } from './branches/branches.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { WorkersModule } from './workers/workers.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    MarketsModule,
    BranchesModule,
    ProductsModule,
    UsersModule,
    WorkersModule,
    PrismaModule,
    AuthModule,
  ],
})
export class AppModule {}
