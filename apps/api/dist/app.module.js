"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const identity_module_1 = require("./modules/identity/identity.module");
const customers_module_1 = require("./modules/customers/customers.module");
const suppliers_module_1 = require("./modules/suppliers/suppliers.module");
const addresses_module_1 = require("./modules/addresses/addresses.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            identity_module_1.IdentityModule,
            customers_module_1.CustomersModule,
            suppliers_module_1.SuppliersModule,
            addresses_module_1.AddressesModule,
            // Member 1 adds OrdersModule, DispatchModule, LedgerModule, BillingModule here
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map