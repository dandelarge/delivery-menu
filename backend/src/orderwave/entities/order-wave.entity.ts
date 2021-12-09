import { OrderItem } from "src/orders/entity/order.entity";
import { UserModel } from "src/users/user.model";

export class OrderWave {}

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