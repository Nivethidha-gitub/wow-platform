import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  // POST /auth/otp  { phone, role }
  @Post('otp')
  requestOtp(@Body() dto: RequestOtpDto) {
    return this.identityService.requestOtp(dto.phone, dto.role);
  }

  // POST /auth/verify  { phone, code, role }
  @Post('verify')
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.identityService.verifyOtp(dto.phone, dto.code, dto.role);
  }

  // GET /auth/me  (requires Authorization: Bearer <token>)
  // Lets the frontend ask "who am I logged in as?" after a page refresh.
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: any) {
    return this.identityService.validateUserFromPayload(req.user);
  }
}
