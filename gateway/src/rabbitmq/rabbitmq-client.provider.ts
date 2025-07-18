import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const rabbitMQClientProvider = {
  provide: 'RABBITMQ_CLIENT',
  useFactory: () => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@127.0.0.1:5672'],
        queue: 'auth_queue',
        queueOptions: { durable: false },
      },
    });
  },
};
