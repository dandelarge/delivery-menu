import { UserModel } from "src/users/user.model";

export interface OrderItem {
  qty: number;
  item: string;
  subtotal?: number;
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