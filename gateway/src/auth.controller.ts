import { Controller, Get } from '@nestjs/common';
import { ClientProxy, Client, Transport } from '@nestjs/microservices';

@Controller('auth') // acessível em http://localhost:8080/auth/usuarios
export class AuthController {
  @Client({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@rabbitmq:5672'],
      queue: 'auth_queue',
      queueOptions: { durable: false },
    },
  })
  private client: ClientProxy;

  @Get('usuarios')
  async getUsuarios() {
    return this.client.send('listar_usuarios', {}); // envia msg pro auth-service
  }
}
