import { Injectable } from '@nestjs/common';
import { CreateOrderWaveDto } from './dto/create-order-wave.dto';
import { UpdateOrderWaveDto } from './dto/update-order-wave.dto';

@Injectable()
export class OrderWaveService {
  create(createOrderWaveDto: CreateOrderWaveDto) {
    return 'This action adds a new orderWave';
  }

  findAll() {
    return `This action returns all orderWave`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderWave`;
  }

  update(id: number, updateOrderWaveDto: UpdateOrderWaveDto) {
    return `This action updates a #${id} orderWave`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderWave`;
  }
}
