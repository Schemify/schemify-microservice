/**
 * ExampleModule
 * -----------------------------------------------------------------------------
 * Módulo raíz del microservicio `Example`.
 *
 * ✅ Importa la infraestructura (repositorios, Kafka, etc.)
 * ✅ Importa la capa de aplicación (CQRS handlers y mappers)
 * ✅ Realiza el binding de puertos a adaptadores (useClass)
 * ✅ Registra los controladores gRPC
 * ✅ Expone el servicio del microservicio en NestJS
 */

import { Module } from '@nestjs/common'

import { ApplicationModule } from './application/application.module'
import { InfrastructureModule } from './infrastructure/infrastructure.module'

// Controladores (HTTP/gRPC/etc.)
import { Controllers } from '@microservice/schemify-microservice/example/infrastructure/adapters/inbounds/controllers'

import { SharedModule } from '@microservice/schemify-microservice/libs/shared/shared.module'
import { ExampleMapper } from '@microservice/schemify-microservice/libs/shared/mappers/example.mapper'

@Module({
  imports: [ApplicationModule, InfrastructureModule, SharedModule],
  providers: [ExampleMapper],
  controllers: [...Controllers]
})
export class ExampleModule {}
