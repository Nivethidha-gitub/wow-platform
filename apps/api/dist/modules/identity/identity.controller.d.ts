import { IdentityService } from './identity.service';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
export declare class IdentityController {
    private readonly identityService;
    constructor(identityService: IdentityService);
    requestOtp(dto: RequestOtpDto): {
        message: string;
        devOtp?: string;
    };
    verifyOtp(dto: VerifyOtpDto): {
        accessToken: string;
        user: import("./identity.service").AuthUser;
    };
    me(req: any): import("./identity.service").AuthUser;
}
