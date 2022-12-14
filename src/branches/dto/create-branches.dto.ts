import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBranchesDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  address: string;
  @IsNotEmpty()
  @IsNumber()
  marketId: number;
}
