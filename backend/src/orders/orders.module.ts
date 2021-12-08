import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { MenuModule } from 'src/menu/menu.module';
import { OrderWaveModule } from 'src/orderwave/orderwave.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [DbModule.forRoot('orders'), MenuModule],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
