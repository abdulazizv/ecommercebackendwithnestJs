import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  title?: string;
  @IsOptional()
  @IsNumber()
  price?: number;
  @IsOptional()
  @IsNumber()
  brachId?: number;
}
