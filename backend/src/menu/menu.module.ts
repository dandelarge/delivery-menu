import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { DbModule } from 'src/db/db.module';
import { OrderWaveModule } from 'src/orderwave/orderwave.module';

@Module({
  imports: [DbModule.forRoot('menu'), OrderWaveModule],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService]
})
export class MenuModule {}
