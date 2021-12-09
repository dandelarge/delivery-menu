import { Module } from '@nestjs/common';
import { OrderWaveService } from './orderwave.service';
import { OrderWaveController } from './orderwave.controller';
import { DbModule } from 'src/db/db.module';
import { MenuModule } from 'src/menu/menu.module';

@Module({
  imports: [DbModule.forRoot('order-waves'), MenuModule],
  controllers: [OrderWaveController],
  providers: [OrderWaveService],
  exports: [OrderWaveService]
})
export class OrderWaveModule {}
