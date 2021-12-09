export class Menu {}

export interface MenuItem {
  name: string;
  price: number;
}
export interface MenuModel {
  items: MenuItem[],
  orderwaveId: string;
}