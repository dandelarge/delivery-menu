import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { MenuModule } from './menu/menu.module';
import { OrderWaveModule } from './orderwave/orderwave.module';
import { MenuService } from './menu/menu.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [AuthModule, DbModule, UsersModule, MenuModule, OrdersModule, OrderWaveModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'client')
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
