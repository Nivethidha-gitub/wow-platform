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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityController = void 0;
const common_1 = require("@nestjs/common");
const identity_service_1 = require("./identity.service");
const request_otp_dto_1 = require("./dto/request-otp.dto");
const verify_otp_dto_1 = require("./dto/verify-otp.dto");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
let IdentityController = class IdentityController {
    constructor(identityService) {
        this.identityService = identityService;
    }
    // POST /auth/otp  { phone, role }
    requestOtp(dto) {
        return this.identityService.requestOtp(dto.phone, dto.role);
    }
    // POST /auth/verify  { phone, code, role }
    verifyOtp(dto) {
        return this.identityService.verifyOtp(dto.phone, dto.code, dto.role);
    }
    // GET /auth/me  (requires Authorization: Bearer <token>)
    // Lets the frontend ask "who am I logged in as?" after a page refresh.
    me(req) {
        return this.identityService.validateUserFromPayload(req.user);
    }
};
exports.IdentityController = IdentityController;
__decorate([
    (0, common_1.Post)('otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_otp_dto_1.RequestOtpDto]),
    __metadata("design:returntype", void 0)
], IdentityController.prototype, "requestOtp", null);
__decorate([
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_otp_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", void 0)
], IdentityController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], IdentityController.prototype, "me", null);
exports.IdentityController = IdentityController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [identity_service_1.IdentityService])
], IdentityController);
//# sourceMappingURL=identity.controller.js.map