import { Module } from '@nestjs/common';
import { DbLowService } from './db-low/db-low.service';

@Module({
  providers: [DbLowService],
  exports: [DbLowService]
})
export class DbModule {}
