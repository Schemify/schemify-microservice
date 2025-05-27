/**
 * ApplicationModule
 * -----------------------------------------------------------------------------
 * Módulo que representa la capa de aplicación (casos de uso, CQRS, lógica orquestadora).
 *
 * Este módulo se encarga de:
 * ✅ Registrar todos los handlers de CQRS (commands, queries, events)
 * ✅ Proveer servicios puros como mappers
 * ✅ Componer la lógica de negocio orquestada desde los controladores
 *
 * 🚫 No registra infraestructura como Prisma o Kafka
 * 🚫 No define rutas ni controladores
 */

import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { PortsModule } from './ports/ports.module'

import { SharedModule } from '@microservice/schemify-microservice/libs/shared/shared.module'
import { ExampleMapper } from '@microservice/schemify-microservice/libs/shared/mappers/example.mapper'

@Module({
  imports: [CqrsModule, PortsModule, SharedModule],
  providers: [ExampleMapper, PortsModule],

  exports: [CqrsModule, PortsModule, ExampleMapper]
})
export class ApplicationModule {}
