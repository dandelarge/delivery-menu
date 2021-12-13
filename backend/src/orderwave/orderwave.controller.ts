import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { OrderWaveService } from './orderwave.service';
import { CreateOrderWaveDto } from './dto/create-order-wave.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('order-wave')
export class OrderWaveController {
  constructor(private readonly orderWaveService: OrderWaveService) {}

  @Post()
  create(@Request() req) {
    const user = req.user;
    const data = req.body as CreateOrderWaveDto;
    return this.orderWaveService.create(data, user);
  }

  @Get()
  findLatest() {
    const orderWave = this.orderWaveService.findLatest();
    const orders = Array.from(orderWave.orders?.values()).filter(order => !!order.items.length);
    const response = {...orderWave, orders};
    return response;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderWaveService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderWaveService.remove(id);
  }
}
