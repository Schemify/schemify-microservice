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

// 📦 CQRS Handlers
import { CommandHandlers } from './commands'
import { QueryHandlers } from './queries'
import { EventHandlers } from './events'

// 📦 Mappers
import { ExampleMapper } from './mappers/example.mapper'

@Module({
  imports: [CqrsModule],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    ExampleMapper
  ],
  exports: [ExampleMapper]
})
export class ApplicationModule {}
