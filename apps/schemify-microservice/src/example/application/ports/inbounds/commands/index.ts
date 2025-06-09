/**
 * Punto de entrada para la capa de **commands** (CQRS).
 *
 * Este archivo exporta:
 * - Todos los comandos (`*.command.ts`) de forma centralizada
 * - El array `CommandHandlers` para registrar en el `CommandBus` de NestJS
 *
 * Esto permite:
 * ✅ Facilitar el registro en los módulos (`@Module.providers`)
 * ✅ Reutilizar los comandos desde cualquier parte del sistema
 * ✅ Mantener una estructura limpia, desacoplada y estandarizada
 *
 * Ejemplo de uso en un módulo:
 *
 * ```ts
 * import { CommandHandlers } from './application/commands'
 *
 * @Module({
 *   providers: [...CommandHandlers],
 * })
 * export class ExampleModule {}
 * ```
 */

// 📦 Array con todos los Command Handlers
import { CreateExampleHandler } from './create-example/create-example.handler'
import { UpdateExampleHandler } from './update-example/update-example.handler'
import { DeleteExampleHandler } from './delete-example/delete-example.handler'

/**
 * Handlers a registrar en el CommandBus
 */
export const CommandHandlers = [
  CreateExampleHandler,
  UpdateExampleHandler,
  DeleteExampleHandler
]

// 📤 Reexportación directa de los comandos para facilitar imports individuales
export * from './create-example/create-example.command'
export * from './update-example/update-example.command'
export * from './delete-example/delete-example.command'
