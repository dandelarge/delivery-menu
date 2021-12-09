import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { OrderItem } from 'src/orders/entity/order.entity';
import { UserModel } from 'src/users/user.model';

import { CreateOrderWaveDto } from './dto/create-order-wave.dto';
import { UpdateOrderWaveDto } from './dto/update-order-wave.dto';
import { OrderWaveModel } from './entities/order-wave.entity';

@Injectable()
export class OrderWaveService {

  constructor(
    private readonly db: DbService,
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

  updateLatest(orderWave: Partial<OrderWaveModel>) {
    const all = this.db.getAll('order-waves') as OrderWaveModel[];
    const latest = all[all.length - 1];
    const latestId = latest.id;
    return this.db.update('order-waves', {...latest, ...orderWave}, latestId, 'id');
  }

  calcSummary(orderWave: OrderWaveModel): OrderItem[] {
    const { orders, menu_id } = orderWave;
    const trackMap = new Map<string, OrderItem>();

    orders.forEach( order => {
      const { items } = order;

      items.forEach( ({item, qty, subtotal}) => {
        const itemSummary = trackMap.get(item) || {item, qty:0, subtotal:0};
        const updatedSummary = {
          item,
          qty: itemSummary.qty + qty,
          subtotal: itemSummary.subtotal + subtotal
        };
        trackMap.set(item, updatedSummary);
      })
    });

    return Array.from(trackMap.values());
  }

  calcTotalFromSummary(summary: OrderItem[]): number {
    return summary.reduce( (prev: number, curr) => prev + curr.subtotal, 0);
  }

  remove(id: number) {
    return `This action removes a #${id} orderWave`;
  }
}
