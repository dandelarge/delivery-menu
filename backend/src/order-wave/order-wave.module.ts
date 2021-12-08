import { Module } from '@nestjs/common';
import { OrderWaveService } from './order-wave.service';
import { OrderWaveController } from './order-wave.controller';

@Module({
  controllers: [OrderWaveController],
  providers: [OrderWaveService]
})
export class OrderWaveModule {}
