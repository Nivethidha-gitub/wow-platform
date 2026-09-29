"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const crypto_1 = require("crypto");
let IdentityService = class IdentityService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.otpStore = new Map();
        this.users = new Map(); // keyed by "phone:role"
    }
    requestOtp(phone, role) {
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
    verifyOtp(phone, code, role) {
        const storeKey = this.key(phone, role);
        const record = this.otpStore.get(storeKey);
        if (!record) {
            throw new common_1.UnauthorizedException('No OTP was requested for this phone number');
        }
        if (Date.now() > record.expiresAt) {
            this.otpStore.delete(storeKey);
            throw new common_1.UnauthorizedException('OTP has expired, please request a new one');
        }
        if (record.code !== code) {
            throw new common_1.UnauthorizedException('Incorrect OTP');
        }
        // OTP is correct and unused — consume it so it can't be replayed
        this.otpStore.delete(storeKey);
        const user = this.findOrCreateUser(phone, role);
        const accessToken = this.jwtService.sign({ sub: user.id, phone: user.phone, role: user.role });
        return { accessToken, user };
    }
    // Used by the JWT guard to attach the logged-in user to each request.
    validateUserFromPayload(payload) {
        return { id: payload.sub, phone: payload.phone, role: payload.role };
    }
    findOrCreateUser(phone, role) {
        const storeKey = this.key(phone, role);
        let user = this.users.get(storeKey);
        if (!user) {
            user = { id: (0, crypto_1.randomUUID)(), phone, role };
            this.users.set(storeKey, user);
        }
        return user;
    }
    key(phone, role) {
        return `${phone}:${role}`;
    }
    generateSixDigitCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
};
exports.IdentityService = IdentityService;
exports.IdentityService = IdentityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], IdentityService);
//# sourceMappingURL=identity.service.js.map