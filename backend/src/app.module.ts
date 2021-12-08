import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { MenuModule } from './menu/menu.module';
import { OrderWaveModule } from './orderwave/orderwave.module';

@Module({
  imports: [AuthModule, DbModule, UsersModule, MenuModule, OrderWaveModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
