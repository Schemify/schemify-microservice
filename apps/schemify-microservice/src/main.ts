import { NestFactory } from '@nestjs/core'
import { Transport, MicroserviceOptions } from '@nestjs/microservices'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'

import { example } from '@app/proto'
import { join } from 'path'

import { GrpcLoggingInterceptor } from './example/infrastructure/interceptors/grpc-logging.interceptor'

import { kafkaCommonConfig } from './example/infrastructure/config/kafka.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const logger = new Logger('SchemifyMicroservice')

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: example.EXAMPLE_PACKAGE_NAME,
      protoPath: join(
        __dirname,
        '../proto/src/services/example_service/example.proto'
      ),
      url: '0.0.0.0:50051'
    }
  })

  if (process.env.NODE_ENV === 'development') {
    app.useGlobalInterceptors(new GrpcLoggingInterceptor())
  }

  // 3. Configurar Kafka (para consumir mensajes asíncronos)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      ...kafkaCommonConfig,
      consumer: {
        groupId: 'schemify-microservice-consumer',
        allowAutoTopicCreation: false
      },
      subscribe: {
        fromBeginning: true
      },
      run: {
        autoCommit: false,
        partitionsConsumedConcurrently: 3
      }
    }
  })
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
}

bootstrap().catch((err) => {
  console.error('Error al iniciar el microservicio:', err)
  process.exit(1)
})
