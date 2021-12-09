import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { MenuModule } from 'src/menu/menu.module';
import { OrderWaveModule } from 'src/orderwave/orderwave.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [DbModule.forRoot('orders'), MenuModule, OrderWaveModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}
