/* eslint-disable @typescript-eslint/no-unsafe-call */

/**
 * ExampleModule
 * -----------------------------------------------------------------------------
 * Módulo raíz del microservicio `Example`.
 *
 * ✅ Importa la infraestructura (repositorios, Kafka, etc.)
 * ✅ Importa la capa de aplicación (CQRS handlers y mappers)
 * ✅ Registra los controladores gRPC
 * ✅ Expone el servicio del microservicio en NestJS
 */

import { Module, Logger } from '@nestjs/common'
import { CqrsModule, QueryBus } from '@nestjs/cqrs'

import { InfrastructureModule } from './infrastructure/infrastructure.module'
import { ApplicationModule } from './application/application.module'

import { Controllers } from './infrastructure/controllers'

@Module({
  imports: [CqrsModule, ApplicationModule, InfrastructureModule],
  controllers: [...Controllers],
  // ✅ No se necesita repetir handlers aquí (ya están en ApplicationModule)
  providers: []
})
export class ExampleModule {
  private readonly logger = new Logger(ExampleModule.name)

  constructor(private readonly queryBus: QueryBus) {
    this.logger.log('✅ ExampleModule cargado correctamente 🚀')
    console.log(
      '📦 QueryHandlers registrados:',
      [...this.queryBus['handlers'].keys()].map((h) => h.name)
    )
  }
}
