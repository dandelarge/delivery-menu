import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { OrderWaveService } from 'src/order-wave/order-wave.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

export interface MenuItem {
  name: string;
  price: number;
}
export interface MenuModel {
  items: MenuItem[],
  orderwaveId: string;
}
@Injectable()
export class MenuService {

  constructor(private readonly db: DbService) {}

  create(menu: CreateMenuDto) {
    return this.db.add('menus', menu);
  }

  findAll() {
    return this.db.getAll('menus');
  }

  findLatest() {
    const menus = this.db.getAll('menus');
    return menus[menus.length - 1];
  }

  findOne(id: string) {
    return this.db.get('menus', id, 'id');
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
