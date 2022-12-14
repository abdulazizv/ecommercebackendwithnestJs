import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMarketDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
