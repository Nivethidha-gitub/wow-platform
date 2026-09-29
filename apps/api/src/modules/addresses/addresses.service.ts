import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressesService {
  private addresses: Address[] = [];

  create(dto: CreateAddressDto): Address {
    const address: Address = {
      id: randomUUID(),
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

  findAllForCustomer(customerId: string): Address[] {
    return this.addresses.filter((a) => a.customerId === customerId);
  }

  findOne(id: string): Address {
    const address = this.addresses.find((a) => a.id === id);
    if (!address) {
      throw new NotFoundException(`Address ${id} not found`);
    }
    return address;
  }
}
