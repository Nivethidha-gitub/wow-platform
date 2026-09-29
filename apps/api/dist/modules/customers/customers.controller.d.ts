import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    create(dto: CreateCustomerDto): import("./entities/customer.entity").Customer;
    findAll(): import("./entities/customer.entity").Customer[];
    findOne(id: string): import("./entities/customer.entity").Customer;
}
