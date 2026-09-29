import { IsBoolean, IsLatitude, IsLongitude, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAddressDto {
  @IsUUID()
  customerId: string;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;

  @IsOptional()
  @IsString()
  flatNumber?: string;

  @IsOptional()
  @IsString()
  floor?: string;

  @IsOptional()
  @IsBoolean()
  liftAvailable?: boolean;

  @IsOptional()
  @IsString()
  gateNotes?: string;
}
