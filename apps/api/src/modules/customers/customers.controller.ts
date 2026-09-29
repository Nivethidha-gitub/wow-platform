import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  // POST /customers
  @Post()
  create(@Body() dto: CreateCustomerDto) {
    return this.customersService.create(dto);
  }

  // GET /customers
  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  // GET /customers/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }
}
