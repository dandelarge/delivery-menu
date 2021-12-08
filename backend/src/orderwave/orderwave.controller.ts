import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { OrderWaveService } from './orderwave.service';
import { CreateOrderWaveDto } from './dto/create-order-wave.dto';
import { UpdateOrderWaveDto } from './dto/update-order-wave.dto';
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
    return this.orderWaveService.findLatest();
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
