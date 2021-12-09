import { Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrderModel, OrderWaveModel } from 'src/orderwave/entities/order-wave.entity';
import { OrderWaveService } from 'src/orderwave/orderwave.service';
import { CreateOrderDto } from './entity/order.entity';
import { OrdersService } from './orders.service';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {

  constructor(
    private readonly ordersService: OrdersService,
    private readonly orderWaveService: OrderWaveService
  ) {}

  @Get()
  findAll(@Request() req) {
    const {userId} = req.user;
    return this.ordersService.findCurrentOrderForUser(userId);
  }

  @Post()
  create(@Request() req) {
    const user = req.user;
    const { items } = req.body as CreateOrderDto;
    const order: OrderModel = {
      user,
      items
    }

    const createdOrder = this.ordersService.create(order);

    const lastWave = this.orderWaveService.findLatest() as OrderWaveModel;
    const orders = lastWave.orders;

    const updatedOrderWave = {...lastWave, orders: [...orders, createdOrder]};
    const summary = this.orderWaveService.calcSummary(updatedOrderWave);
    const total = this.orderWaveService.calcTotalFromSummary(summary);

    this.orderWaveService.updateLatest({orders: [...orders, createdOrder], summary, total});

    return createdOrder;
  }

  @Patch()
  update(@Request() req) {
    const {userId} = req.user;
    const orderData = req.body as Partial<CreateOrderDto>;
    const {id} = this.ordersService.findCurrentOrderForUser(userId);

    const lastWave = this.orderWaveService.findLatest() as OrderWaveModel;
    const orders = lastWave.orders;

    const createdOrder = this.ordersService.update(userId, id, orderData ) as OrderModel;

    const updatedOrderWave = {...lastWave, orders: [...orders, createdOrder]};
    const summary = this.orderWaveService.calcSummary(updatedOrderWave);
    const total = this.orderWaveService.calcTotalFromSummary(summary);

    this.orderWaveService.updateLatest({orders: [...orders, createdOrder], summary, total});

    return createdOrder;
  }

}
