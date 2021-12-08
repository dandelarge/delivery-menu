import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { OrderItem } from 'src/orders/orders.service';
import { UserModel } from 'src/users/users.service';
import { CreateOrderWaveDto } from './dto/create-order-wave.dto';
import { UpdateOrderWaveDto } from './dto/update-order-wave.dto';

export interface OrderModel {
  id?: string;
  user: UserModel;
  items: OrderItem[];
  total: number;
}
export interface OrderWaveModel {
  id?: string;
  handler: UserModel;
  order_before: string;
  menu_id: string;
  orders: OrderModel[];
  summary: OrderModel[];
  total: number;
}

@Injectable()
export class OrderWaveService {

  constructor(
    private readonly db: DbService
  ) {}

  create(data: CreateOrderWaveDto, {name, id}: UserModel) {
    const { order_before, menu_id } = data;
    const orderWaveDBData: OrderWaveModel = {
      handler: {
        name,
        id
      },
      order_before,
      orders: [], // TODO: fetch the orders with ordersService
      summary: [],
      total: 0,
      menu_id
    }
    return this.db.add('order-waves', orderWaveDBData);
  }

  findAll() {
    return `This action returns all orderWave`;
  }

  findLatest() {
    const orderWaves = this.db.getAll('order-waves');
    return orderWaves[ orderWaves.length - 1];
  }

  findOne(id: number) {
    return `This action returns a #${id} orderWave`;
  }

  update(id: number, updateOrderWaveDto: UpdateOrderWaveDto) {
    return `This action updates a #${id} orderWave`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderWave`;
  }
}
