interface MenuItem {
  name: string;
  price: number
}

export class CreateMenuDto {
  items: MenuItem[];
}
