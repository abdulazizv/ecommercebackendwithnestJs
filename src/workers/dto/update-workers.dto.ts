import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateWorkerDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  phoneNumber?: string;
  @IsOptional()
  @IsNumber()
  branchId?: number;
}
