import { IsIn, IsString, Length } from 'class-validator';
import { UserRole } from './request-otp.dto';

export class VerifyOtpDto {
  @IsString()
  phone: string;

  @IsString()
  @Length(6, 6, { message: 'OTP must be exactly 6 digits' })
  code: string;

  @IsIn(['customer', 'supplier', 'rider'])
  role: UserRole;
}
