import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
export declare class AddressesController {
    private readonly addressesService;
    constructor(addressesService: AddressesService);
    create(dto: CreateAddressDto): import("./entities/address.entity").Address;
    findForCustomer(customerId: string): import("./entities/address.entity").Address[];
    findOne(id: string): import("./entities/address.entity").Address;
}
