import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { UserRole } from './dto/request-otp.dto';

// Temporary in-memory OTP store, keyed by "phone:role".
// This resets every time the server restarts — that's expected for now.
// Once Redis is wired up (later), this moves there so OTPs survive restarts
// and expire automatically.
interface OtpRecord {
  code: string;
  expiresAt: number; // unix timestamp in ms
}

// A minimal "who is this person" record. Real customer/supplier/rider
// profile data (name, address, etc.) lives in the customers/suppliers
// modules — this is just enough to log someone in and remember their role.
export interface AuthUser {
  id: string;
  phone: string;
  role: UserRole;
}

@Injectable()
export class IdentityService {
  private otpStore = new Map<string, OtpRecord>();
  private users = new Map<string, AuthUser>(); // keyed by "phone:role"

  constructor(private jwtService: JwtService) {}

  requestOtp(phone: string, role: UserRole): { message: string; devOtp?: string } {
    const code = this.generateSixDigitCode();
    const expiresAt = Date.now() + 5 * 60 * 1000; // valid for 5 minutes

    this.otpStore.set(this.key(phone, role), { code, expiresAt });

    // TODO (later): send this via actual SMS/WhatsApp provider instead of
    // logging it. For local development we log it so you can test the flow
    // without a real SMS account.
    console.log(`[DEV ONLY] OTP for ${phone} (${role}): ${code}`);

    return {
      message: 'OTP sent',
      // devOtp is only returned so you can test without SMS set up.
      // Remove this field before going to production.
      devOtp: process.env.NODE_ENV === 'production' ? undefined : code,
    };
  }

  verifyOtp(phone: string, code: string, role: UserRole): { accessToken: string; user: AuthUser } {
    const storeKey = this.key(phone, role);
    const record = this.otpStore.get(storeKey);

    if (!record) {
      throw new UnauthorizedException('No OTP was requested for this phone number');
    }
    if (Date.now() > record.expiresAt) {
      this.otpStore.delete(storeKey);
      throw new UnauthorizedException('OTP has expired, please request a new one');
    }
    if (record.code !== code) {
      throw new UnauthorizedException('Incorrect OTP');
    }

    // OTP is correct and unused — consume it so it can't be replayed
    this.otpStore.delete(storeKey);

    const user = this.findOrCreateUser(phone, role);
    const accessToken = this.jwtService.sign({ sub: user.id, phone: user.phone, role: user.role });

    return { accessToken, user };
  }

  // Used by the JWT guard to attach the logged-in user to each request.
  validateUserFromPayload(payload: { sub: string; phone: string; role: UserRole }): AuthUser {
    return { id: payload.sub, phone: payload.phone, role: payload.role };
  }

  private findOrCreateUser(phone: string, role: UserRole): AuthUser {
    const storeKey = this.key(phone, role);
    let user = this.users.get(storeKey);
    if (!user) {
      user = { id: randomUUID(), phone, role };
      this.users.set(storeKey, user);
    }
    return user;
  }

  private key(phone: string, role: UserRole): string {
    return `${phone}:${role}`;
  }

  private generateSixDigitCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
