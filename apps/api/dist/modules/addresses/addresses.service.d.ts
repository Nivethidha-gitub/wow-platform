import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
export declare class AddressesService {
    private addresses;
    create(dto: CreateAddressDto): Address;
    findAllForCustomer(customerId: string): Address[];
    findOne(id: string): Address;
}
