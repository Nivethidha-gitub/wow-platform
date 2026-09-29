"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressesService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let AddressesService = class AddressesService {
    constructor() {
        this.addresses = [];
    }
    create(dto) {
        const address = {
            id: (0, crypto_1.randomUUID)(),
            customerId: dto.customerId,
            latitude: dto.latitude,
            longitude: dto.longitude,
            flatNumber: dto.flatNumber,
            floor: dto.floor,
            liftAvailable: dto.liftAvailable,
            gateNotes: dto.gateNotes,
            createdAt: new Date(),
        };
        this.addresses.push(address);
        return address;
    }
    findAllForCustomer(customerId) {
        return this.addresses.filter((a) => a.customerId === customerId);
    }
    findOne(id) {
        const address = this.addresses.find((a) => a.id === id);
        if (!address) {
            throw new common_1.NotFoundException(`Address ${id} not found`);
        }
        return address;
    }
};
exports.AddressesService = AddressesService;
exports.AddressesService = AddressesService = __decorate([
    (0, common_1.Injectable)()
], AddressesService);
//# sourceMappingURL=addresses.service.js.map