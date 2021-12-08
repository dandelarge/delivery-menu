import { Module } from '@nestjs/common';
import { OrderWaveService } from './order-wave.service';
import { OrderWaveController } from './order-wave.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule.forRoot('order-waves')],
  controllers: [OrderWaveController],
  providers: [OrderWaveService],
  exports: [OrderWaveService]
})
export class OrderWaveModule {}
