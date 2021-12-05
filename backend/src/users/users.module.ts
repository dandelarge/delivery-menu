import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { DbService } from 'src/db/db.service';
import { UsersService } from './users.service';

@Module({
  imports: [DbModule.forRoot('users')],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
