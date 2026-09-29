import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  // POST /addresses
  @Post()
  create(@Body() dto: CreateAddressDto) {
    return this.addressesService.create(dto);
  }

  // GET /addresses?customerId=xyz
  @Get()
  findForCustomer(@Query('customerId') customerId: string) {
    return this.addressesService.findAllForCustomer(customerId);
  }

  // GET /addresses/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressesService.findOne(id);
  }
}
