// gateway/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  await app.listen(3001);
  console.log('Gateway rodando na porta 3001 com RabbitMQ');
}
bootstrap();
