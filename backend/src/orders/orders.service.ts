import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { MenuItem, MenuModel } from 'src/menu/entities/menu.entity';
import { MenuService } from 'src/menu/menu.service';
import { OrderWaveService } from 'src/orderwave/orderwave.service';
import { OrderItem, OrderModel } from './entity/order.entity';

@Injectable()
export class OrdersService {

  constructor(
    private readonly dbService: DbService,
    private readonly menuService: MenuService,
    private readonly orderWaveService: OrderWaveService
  ) {}

  findAll() {
    return this.dbService.getAll('orders');
  }

  private calculateTotal(orderItems: OrderItem[], menuItems: MenuItem[]): [OrderItem[], number] {
    const priceMap = new Map();
    menuItems.forEach( ({name, price}) => priceMap.set(name, price));
    let total = 0;
    const updatedOrderItems = [];

    orderItems.forEach( ({item, qty}) => {
      const price = priceMap.get(item);
      const subtotal = price * qty;
      updatedOrderItems.push({item, qty, subtotal})
      total += subtotal;
    });
    return [updatedOrderItems, total];
  }

  create(orderData: OrderModel) {
    const menu = this.menuService.findLatest() as MenuModel;
    const [updatedOrderItems, orderTotal] = this.calculateTotal(orderData.items, menu.items);
    const calculatedData: OrderModel = {...orderData, items: updatedOrderItems, total: orderTotal};
    return  this.dbService.add<OrderModel>('orders', calculatedData);
  }

  findCurrentOrderForUser(id: string): OrderModel {
    const userOrders = this.dbService.filter('orders', (item => item.user.userId === id)) as OrderModel[];
    return userOrders[userOrders.length - 1];
  }

  update(userId: string, id: string, orderData: Partial<OrderModel>) {
    const menu = this.menuService.findLatest() as MenuModel;
    const [updatedOrderItems, orderTotal] = this.calculateTotal(orderData.items, menu.items);
    const currentUserOrder = this.findCurrentOrderForUser(userId);
    const updatedOrder: OrderModel = {
      ...currentUserOrder,
      items: updatedOrderItems,
      total: orderTotal
    };
    return this.dbService.update('orders', updatedOrder, id, 'id');
  }

}
