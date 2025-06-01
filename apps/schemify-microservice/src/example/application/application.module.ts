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

import { CommandHandlers } from './ports/inbounds/commands/'
import { QueryHandlers } from './ports/inbounds/queries'
import { EventHandlers } from './ports/inbounds/events'
import { UseCasesModule } from './use-cases/use-cases.module'

import { SharedModule } from '@example//libs/shared/shared.module'
import { ExampleMapper } from '@example//libs/shared/mappers/example.mapper'

import { OutboundsModule } from '@example//example/infrastructure/adapters/outbounds/outbounds.module'

@Module({
  imports: [CqrsModule, SharedModule, OutboundsModule, UseCasesModule],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    ExampleMapper
  ],
  exports: [CqrsModule]
})
export class ApplicationModule {}
