import { Supplier } from './entities/supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
export declare class SuppliersService {
    private suppliers;
    create(dto: CreateSupplierDto): Supplier;
    findAll(): Supplier[];
    findOne(id: string): Supplier;
    findActiveAndVerified(): Supplier[];
}
