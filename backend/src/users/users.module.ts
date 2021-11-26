import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, {provide: 'DbName', useValue: 'users'}],
  exports: [UsersService]
})
export class UsersModule {}
