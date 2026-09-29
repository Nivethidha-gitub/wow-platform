import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Supplier } from './entities/supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';

@Injectable()
export class SuppliersService {
  private suppliers: Supplier[] = [];

  create(dto: CreateSupplierDto): Supplier {
    const supplier: Supplier = {
      id: randomUUID(),
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

  findAll(): Supplier[] {
    return this.suppliers;
  }

  findOne(id: string): Supplier {
    const supplier = this.suppliers.find((s) => s.id === id);
    if (!supplier) {
      throw new NotFoundException(`Supplier ${id} not found`);
    }
    return supplier;
  }

  // Used later by the fallback engine (Member 1's dispatch module) to find
  // eligible backup suppliers. Kept simple for now.
  findActiveAndVerified(): Supplier[] {
    return this.suppliers.filter((s) => s.status === 'active');
  }
}
