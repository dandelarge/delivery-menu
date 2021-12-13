import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuModel } from './entities/menu.entity';
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

  getPriceMapOf(id: string): Map<string, number> {
    const priceMap = new Map<string, number>()
    const { items } = this.db.get('menus', id, 'id') as MenuModel;
    items.forEach( ({price, name}) => {
      priceMap.set(name, price);
    });

    return priceMap;
  }

  update(id: string, updateMenuDto: UpdateMenuDto) {
    const menu = this.db.get('menus', id, 'id') as MenuModel;

    menu.items = updateMenuDto.items;
    return this.db.update('menus', menu, id, 'id');
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
