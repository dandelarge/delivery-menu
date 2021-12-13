import { MenuModel } from "src/menu/entities/menu.entity";
import { OrderItem } from "src/orders/entity/order.entity";
import { UserModel } from "src/users/user.model";
export interface OrderModel {
  id?: string;
  user: UserModel;
  items: OrderItem[];
  total?: number;
}
export interface OrderWaveModel {
  id?: string;
  handler: UserModel;
  order_before: string;
  menu_id: string;
  orders: OrderModel[];
  summary: OrderItem[];
  total: number;
}

export interface OrderWave {
  id?: string;
  handler: UserModel;
  menu?: MenuModel;
  order_before?: string;
  orders?: Map<string, OrderModel>;
  rawOrders?: Array<[string, OrderModel]>;
  summary?: OrderItem[];
  total?: number;
}