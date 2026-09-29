import { Module } from '@nestjs/common';
import { IdentityModule } from './modules/identity/identity.module';
import { CustomersModule } from './modules/customers/customers.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { AddressesModule } from './modules/addresses/addresses.module';

@Module({
  imports: [
    IdentityModule,
    CustomersModule,
    SuppliersModule,
    AddressesModule,
    // Member 1 adds OrdersModule, DispatchModule, LedgerModule, BillingModule here
  ],
})
export class AppModule {}
