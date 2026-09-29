import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
export declare class CustomersService {
    private customers;
    create(dto: CreateCustomerDto): Customer;
    findAll(): Customer[];
    findOne(id: string): Customer;
    findByPhone(phone: string): Customer | undefined;
}
