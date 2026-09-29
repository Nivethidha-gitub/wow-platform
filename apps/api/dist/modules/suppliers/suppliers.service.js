"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuppliersService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let SuppliersService = class SuppliersService {
    constructor() {
        this.suppliers = [];
    }
    create(dto) {
        const supplier = {
            id: (0, crypto_1.randomUUID)(),
            name: dto.name,
            plan: dto.plan ?? 'starter',
            status: 'pending_verification',
            acceptanceWindowMinutes: dto.acceptanceWindowMinutes ?? 20,
            refillEnabled: dto.refillEnabled ?? false,
            reliabilityScore: 100, // starts perfect, adjusted later by real deliveries
            createdAt: new Date(),
        };
        this.suppliers.push(supplier);
        return supplier;
    }
    findAll() {
        return this.suppliers;
    }
    findOne(id) {
        const supplier = this.suppliers.find((s) => s.id === id);
        if (!supplier) {
            throw new common_1.NotFoundException(`Supplier ${id} not found`);
        }
        return supplier;
    }
    // Used later by the fallback engine (Member 1's dispatch module) to find
    // eligible backup suppliers. Kept simple for now.
    findActiveAndVerified() {
        return this.suppliers.filter((s) => s.status === 'active');
    }
};
exports.SuppliersService = SuppliersService;
exports.SuppliersService = SuppliersService = __decorate([
    (0, common_1.Injectable)()
], SuppliersService);
//# sourceMappingURL=suppliers.service.js.map