import { IsBoolean, IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsIn(['starter', 'growth', 'network'])
  plan?: 'starter' | 'growth' | 'network';

  @IsOptional()
  @IsInt()
  @Min(5)
  acceptanceWindowMinutes?: number;

  @IsOptional()
  @IsBoolean()
  refillEnabled?: boolean;
}
