import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateBranchesDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  address?: string;
  @IsOptional()
  @IsNumber()
  marketId?: number;
}
