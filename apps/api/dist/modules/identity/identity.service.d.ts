import { JwtService } from '@nestjs/jwt';
import { UserRole } from './dto/request-otp.dto';
export interface AuthUser {
    id: string;
    phone: string;
    role: UserRole;
}
export declare class IdentityService {
    private jwtService;
    private otpStore;
    private users;
    constructor(jwtService: JwtService);
    requestOtp(phone: string, role: UserRole): {
        message: string;
        devOtp?: string;
    };
    verifyOtp(phone: string, code: string, role: UserRole): {
        accessToken: string;
        user: AuthUser;
    };
    validateUserFromPayload(payload: {
        sub: string;
        phone: string;
        role: UserRole;
    }): AuthUser;
    private findOrCreateUser;
    private key;
    private generateSixDigitCode;
}
