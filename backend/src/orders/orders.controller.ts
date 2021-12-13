import { Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrderModel, OrderWave, OrderWaveModel } from 'src/orderwave/entities/order-wave.entity';
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
    return this.ordersService.findCurrentOrderForUserWithId(userId);
  }

  @Post()
  create(@Request() req) {
    const user = req.user;
    const { items } = req.body as CreateOrderDto;

    const order: OrderModel = {
      user: {
        name: user.username,
        id: user.userId
      },
      items
    }

    const {id, orders} = this.orderWaveService.findLatest();

    let currentUserOrder = orders.get(user.userId);
    if(!currentUserOrder) {
      currentUserOrder = this.ordersService.create(order);
    }

    const orderWaveWithOrders = this.orderWaveService.addOrUpdateOrders(id, [currentUserOrder]);
    const summary = this.orderWaveService.calcSummary(orderWaveWithOrders);
    const total = this.orderWaveService.calcTotalFromSummary(summary);
    this.orderWaveService.update(id, {summary, total});

    return currentUserOrder;
  }

  @Patch()
  update(@Request() req) {
    const {userId} = req.user;
    const orderData = req.body as CreateOrderDto;
    let currentOrder = this.ordersService.findCurrentOrderForUserWithId(userId);


    if (!currentOrder) {
      currentOrder = this.create(req);
    }

    const { id: orderId } = currentOrder;
    const updatedOrder = this.ordersService.update(userId, orderId, orderData) as OrderModel;

    const {id:orderWaveId} = this.orderWaveService.findLatest();
    const updatedOrderWave = this.orderWaveService.addOrUpdateOrders(orderWaveId, [updatedOrder]);
    const summary = this.orderWaveService.calcSummary(updatedOrderWave);
    const total = this.orderWaveService.calcTotalFromSummary(summary);
    this.orderWaveService.update(orderWaveId, {summary, total});

    return updatedOrder
  }

}
