import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { MenuService } from 'src/menu/menu.service';
import { OrderWaveService } from 'src/orderwave/orderwave.service';
import { UserModel } from 'src/users/users.service';

export interface OrderItem {
  qty: number;
  item: string;
  subtotal: number;
}

export class CreateOrderDto {
  items: OrderItem[]
}

export interface OrderModel {
  id?: string;
  user: UserModel;
  items: OrderItem[];
  total?: number;
}

@Injectable()
export class OrdersService {

  constructor(
    private readonly db: DbService,
    private readonly menuService: MenuService,
  ) {}

  findAll() {
    return [];
  }

  private calculateTotal(orderItems: OrderItem[]): number {
    return 0;
  }

  create(orderData: OrderModel) {

    const order = this.db.add<OrderModel>('orders', orderData);
  }

}
