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

import { InfrastructureModule } from './infrastructure/infrastructure.module'
import { ApplicationModule } from './application/application.module'

import { SharedModule } from '@example//libs/shared/shared.module'

@Module({
  imports: [InfrastructureModule, ApplicationModule, SharedModule],

  exports: [InfrastructureModule, ApplicationModule, SharedModule]
})
export class ExampleModule {}
