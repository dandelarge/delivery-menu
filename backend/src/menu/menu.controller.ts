import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { OrderWaveService } from 'src/orderwave/orderwave.service';
import { MenuModel } from './entities/menu.entity';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService, private readonly orderwaveService: OrderWaveService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    let { menu, id } = this.orderwaveService.findLatest();

    if (!menu) {
      menu = this.menuService.create(createMenuDto);
    }
    menu.items = createMenuDto.items;
    this.orderwaveService.addOrUpdateMenu(id, menu);
    this.orderwaveService.resetOrders(id);
    return menu;
  }

  @Get()
  findLatest() {
    const { menu } = this.orderwaveService.findLatest();
    if (!menu) {
      return new Error('There\'s no menu yet :(')
    }
    return menu;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    const newMenu = this.menuService.update(id, updateMenuDto) as MenuModel;
    const { id: orderWaveId } =  this.orderwaveService.findLatest();
    this.orderwaveService.addOrUpdateMenu(orderWaveId, newMenu);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
