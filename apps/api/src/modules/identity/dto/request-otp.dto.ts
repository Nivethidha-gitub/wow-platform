import { IsIn, IsString, Matches } from 'class-validator';

export type UserRole = 'customer' | 'supplier' | 'rider';

// Defines exactly what shape the request body must have.
// If someone sends bad data, NestJS rejects it automatically before it
// ever reaches your service code.
export class RequestOtpDto {
  @IsString()
  @Matches(/^\+?[0-9]{10,15}$/, {
    message: 'phone must be a valid phone number, e.g. +919876543210',
  })
  phone: string;

  // Which login screen the person came from. This determines which
  // dashboard they land on after verifying — a customer, a supplier
  // owner/staff member, or a rider all use the same OTP flow, just
  // tagged differently.
  @IsIn(['customer', 'supplier', 'rider'])
  role: UserRole;
}
