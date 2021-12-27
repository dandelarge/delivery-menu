import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { MenuModel } from 'src/menu/entities/menu.entity';
import { OrderItem, OrderModel } from 'src/orders/entity/order.entity';

import { CreateOrderWaveDto } from './dto/create-order-wave.dto';
import { OrderWave, OrderWaveModel } from './entities/order-wave.entity';

@Injectable()
export class OrderWaveService {

  constructor(
    private readonly db: DbService,
  ) {}

  create(data: CreateOrderWaveDto, {username, userId}: {username: string, userId: string}) {
    const { order_before } = data;
    const orderWaveDBData: OrderWave = {
      handler: {
        name: username,
        id: userId
      },
      order_before,
      summary: [],
      total: 0,
    }
    return this.db.add('order-waves', orderWaveDBData);
  }

  findAll() {
    return `This action returns all orderWave`;
  }

  findLatest(): OrderWave {
    const orderWaves = this.db.getAll('order-waves') as OrderWave[];
    const latest = orderWaves[ orderWaves.length - 1];
    latest.orders = new Map(latest.rawOrders);
    return latest;
  }

  findOne(id: string): OrderWave {
    const orderWave =  this.db.get('order-waves', id, 'id') as OrderWave;
    orderWave.orders = new Map(orderWave.rawOrders);
    return orderWave;
  }

  update(id: string, data: Partial<OrderWave>): OrderWave {
    const orderWave = this.findOne(id) as OrderWave;
    if (!orderWave) {
      return null;
    }

    const result = {...orderWave, ...data};
    const updatedOrderWave = this.db.update('order-waves', result, id, 'id') as OrderWave;
    updatedOrderWave.orders = new Map(updatedOrderWave.rawOrders)
    return updatedOrderWave;
  }

  updateLatest(orderWave: Partial<OrderWaveModel>): OrderWave {
    const all = this.db.getAll('order-waves') as OrderWaveModel[];
    const latest = all[all.length - 1];
    const latestId = latest.id;
    const updatedOrderWave = this.db.update('order-waves', {...latest, ...orderWave}, latestId, 'id') as OrderWave;
    updatedOrderWave.orders = new Map(updatedOrderWave.rawOrders)
    return updatedOrderWave;
  }

  calcSummary(orderWave: OrderWave): OrderItem[] {
    const { orders } = orderWave;
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

  remove(id: string) {
    return `This action removes a #${id} orderWave`;
  }

  addOrUpdateMenu(id: string, menu: MenuModel): OrderWave {
    const orderWave = this.findOne(id) as OrderWave;
    orderWave.menu = menu;
    return this.db.update('order-waves', orderWave, id, 'id') as OrderWave;
  }

  addOrUpdateOrders(id: string, orders: OrderModel[]): OrderWave {
    const orderWave = this.findOne(id) as OrderWave;

    let rawOrders = orderWave.rawOrders || [];
    const ordersMap =  new Map<string, OrderModel>(rawOrders);

    orders.forEach( order => ordersMap.set(order.user.id, order));

    const newRawOrders = Array.from(ordersMap);
    orderWave.rawOrders = newRawOrders;

    this.db.update('order-waves', orderWave, id, 'id');
    orderWave.orders = ordersMap;

    return orderWave;
  }

  updateOrdersWithNewMenu(id: string, menu: MenuModel): OrderWave {
    const orderWave = this.findOne(id) as OrderWave;
    const menuMap = new Map<string, number>();
    menu.items?.forEach(({name, price}) => {
      menuMap.set(name, price);
    });

    const rawOrders = orderWave.rawOrders || [];
    const orderMap = new Map(rawOrders);

    orderMap.forEach( order => {
      const updatedItems = order.items
        .filter( ({item}) => menuMap.get(item))
        .map( ({item, qty}) => ({
          item,
          qty,
          subtotal: qty * menuMap.get(item)
        }));
      const total = updatedItems.reduce((prev, curr) => prev + curr.subtotal, 0);
      const updatedOder = {...order, items: updatedItems, total };
      if (total > 0) orderMap.set(order.user.id, updatedOder);
    });

    const updatedOrdersRaw = Array.from(orderMap);
    const genOrderWave = { ...orderWave, rawOrders: updatedOrdersRaw };

    const updatedOrderWave = this.db.update('order-waves', genOrderWave, id, 'id') as OrderWave;
    updatedOrderWave.orders = new Map<string, OrderModel>(updatedOrdersRaw);

    return updatedOrderWave;
  }

  resetOrders(id: string): OrderWave {
    const orderWave = this.findOne(id) as OrderWave;
    orderWave.rawOrders = [];
    orderWave.summary = [];
    orderWave.total = 0;

    const updatedOrderWave = this.db.update('order-waves', orderWave, id, 'id') as OrderWave;
    updatedOrderWave.orders = new Map<string, OrderModel>();

    return updatedOrderWave;
  }

}
