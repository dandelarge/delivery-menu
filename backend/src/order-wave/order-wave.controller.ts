import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderWaveService } from './order-wave.service';
import { CreateOrderWaveDto } from './dto/create-order-wave.dto';
import { UpdateOrderWaveDto } from './dto/update-order-wave.dto';

@Controller('order-wave')
export class OrderWaveController {
  constructor(private readonly orderWaveService: OrderWaveService) {}

  @Post()
  create(@Body() createOrderWaveDto: CreateOrderWaveDto) {
    return this.orderWaveService.create(createOrderWaveDto);
  }

  @Get()
  findAll() {
    return this.orderWaveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderWaveService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderWaveDto: UpdateOrderWaveDto) {
    return this.orderWaveService.update(+id, updateOrderWaveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderWaveService.remove(+id);
  }
}
