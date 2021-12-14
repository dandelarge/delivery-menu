import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.NODE_ENV === 'production' ? 80 : 3012

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(port);
}
bootstrap();
