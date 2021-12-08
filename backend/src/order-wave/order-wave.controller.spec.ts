import { Test, TestingModule } from '@nestjs/testing';
import { OrderWaveController } from './order-wave.controller';
import { OrderWaveService } from './order-wave.service';

describe('OrderWaveController', () => {
  let controller: OrderWaveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderWaveController],
      providers: [OrderWaveService],
    }).compile();

    controller = module.get<OrderWaveController>(OrderWaveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
