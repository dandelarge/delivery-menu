import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderWaveDto } from './create-order-wave.dto';

export class UpdateOrderWaveDto extends PartialType(CreateOrderWaveDto) {}
