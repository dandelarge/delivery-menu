import { Test, TestingModule } from '@nestjs/testing';
import { OrderWaveService } from './orderwave.service';

describe('OrderWaveService', () => {
  let service: OrderWaveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderWaveService],
    }).compile();

    service = module.get<OrderWaveService>(OrderWaveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
