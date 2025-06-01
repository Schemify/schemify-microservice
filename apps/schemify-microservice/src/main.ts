import { NestFactory } from '@nestjs/core'
// import { Transport, MicroserviceOptions } from '@nestjs/microservices'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'

// import { join } from 'path'

// import { example } from '@proto'

import { GrpcLoggingInterceptor } from './example/infrastructure/shared/interceptors/grpc-logging.interceptor'

import { GrpcServerModule } from './example/infrastructure/adapters/inbounds/grpc/grpc-server.module'

// import { EventBus } from '@nestjs/cqrs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableShutdownHooks()

  const logger = new Logger('SchemifyMicroservice')

  app.connectMicroservice(GrpcServerModule.transport())

  if (process.env.NODE_ENV === 'development') {
    app.useGlobalInterceptors(new GrpcLoggingInterceptor())
  }

  await app.startAllMicroservices()
  logger.log('✅ Microservicio gRPC listo en puerto 50051')

  if (process.env.NODE_ENV === 'development') {
    app.useGlobalInterceptors(new GrpcLoggingInterceptor())
    logger.verbose('🧪 Interceptor de logging habilitado')
  }

  await app.init()
}

bootstrap().catch((err) => {
  const logger = new Logger('Bootstrap')
  logger.error('💥 Error al iniciar el microservicio', err)
  process.exit(1)
})
