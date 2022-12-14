import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWorkerDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
  @IsNotEmpty()
  @IsNumber()
  branchId: number;
}
