import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  // In-memory "database" — an array. Replaced by a real Postgres table later.
  private customers: Customer[] = [];

  create(dto: CreateCustomerDto): Customer {
    const customer: Customer = {
      id: randomUUID(),
      phone: dto.phone,
      name: dto.name,
      language: dto.language ?? 'ta',
      whatsappOptIn: true,
      createdAt: new Date(),
    };
    this.customers.push(customer);
    return customer;
  }

  findAll(): Customer[] {
    return this.customers;
  }

  findOne(id: string): Customer {
    const customer = this.customers.find((c) => c.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    return customer;
  }

  findByPhone(phone: string): Customer | undefined {
    return this.customers.find((c) => c.phone === phone);
  }
}
