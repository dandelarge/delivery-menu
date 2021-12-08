import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateOrderDto, OrderModel, OrdersService } from './orders.service';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {

  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(@Request() req) {
    return this.ordersService.findAll();
  }

  @Post()
  create(@Request() req) {
    const user = req.user;
    const { items } = req.body as CreateOrderDto;

    const order: OrderModel = {
      user,
      items
    }

    return this.ordersService.create(order);
  }

}
