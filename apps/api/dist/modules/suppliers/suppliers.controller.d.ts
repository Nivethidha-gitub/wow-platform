import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
export declare class SuppliersController {
    private readonly suppliersService;
    constructor(suppliersService: SuppliersService);
    create(dto: CreateSupplierDto): import("./entities/supplier.entity").Supplier;
    findAll(): import("./entities/supplier.entity").Supplier[];
    findOne(id: string): import("./entities/supplier.entity").Supplier;
}
