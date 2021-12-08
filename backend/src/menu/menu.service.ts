import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
const menu = [
  {
    id: '1',
    name: 'hash',
    price: 10.5
  },{
    id: '2',
    name: 'gorilla weed',
    price: 7
  },{
    id: '3',
    name: 'strong shit',
    price: 8.5
  },{
    id: '4',
    name: 'the less strong shit',
    price: 15
  },{
    id: '5',
    name: 'the fuck is this',
    price: 14
  },{
    id: '6',
    name: 'im tired',
    price: 20
  },{
    id: '7',
    name: 'of writing',
    price: 22
  }
];
@Injectable()
export class MenuService {
  create(createMenuDto: CreateMenuDto) {
    return 'This action adds a new menu';
  }

  findAll() {
    return JSON.stringify(menu);
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
