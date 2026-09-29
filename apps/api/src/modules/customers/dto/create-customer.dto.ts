import { IsIn, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  phone: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsIn(['ta', 'en'])
  language?: 'ta' | 'en';
}
