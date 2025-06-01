import { NestFactory } from '@nestjs/core'
// import { Transport, MicroserviceOptions } from '@nestjs/microservices'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'

// import { join } from 'path'

// import { example } from '@proto'

import { GrpcLoggingInterceptor } from './example/infrastructure/shared/interceptors/grpc-logging.interceptor'

import { GrpcServerModule } from './example/infrastructure/adapters/inbounds/grpc/grpc-server.module'
import { KafkaConsumerModule } from './example/infrastructure/adapters/inbounds/messaging/kafka/kafka-consumer.module'
import { KafkaProducerService } from './example/infrastructure/adapters/outbounds/messaging/kafka/client/kafka-producer.service'

import { EventBus } from '@nestjs/cqrs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const logger = new Logger('SchemifyMicroservice')

  app.connectMicroservice(GrpcServerModule.transport())

  if (process.env.NODE_ENV === 'development') {
    app.useGlobalInterceptors(new GrpcLoggingInterceptor())
  }

  app.connectMicroservice(
    KafkaConsumerModule.transport({
      clientId: 'schemify-client',
      groupId: 'schemify-group',
      brokers: ['kafka1:9092']
    })
  )

  // 4. Iniciar los microservicios
  await app.startAllMicroservices()
  logger.log('✅ Microservicio gRPC listo en puerto 50051')

  if (process.env.NODE_ENV === 'development') {
    app.useGlobalInterceptors(new GrpcLoggingInterceptor())
    logger.verbose(
      '🧪 Modo desarrollo activado, interceptor de logging habilitado'
    )
  } else {
    logger.log(`🚀 Modo producción: NODE_ENV=${process.env.NODE_ENV}`)
  }

  await app.init()

  const kafka = app.get(KafkaProducerService)

  await kafka.emit('example.created', {
    id: 'test-123',
    name: 'Prueba directa',
    description: 'Desde bootstrap main.ts'
  })

  const eventBus = app.get(EventBus)
  eventBus.subscribe((event) => {
    console.log('📡 EVENTO DETECTADO DESDE EL BUS:', event)
  })
}

bootstrap().catch((err) => {
  console.error('Error al iniciar el microservicio:', err)
  process.exit(1)
})
