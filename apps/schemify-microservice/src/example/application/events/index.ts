/**
 * Punto de entrada para los **Event Handlers** de la capa de aplicación.
 *
 * Esta capa está diseñada para responder a eventos de dominio emitidos
 * por las entidades (`this.apply(...)`) y propagados vía `EventBus` de NestJS.
 *
 * Los handlers aquí definidos:
 * - No deben tener lógica de negocio
 * - No deben usar infraestructura directamente (ej: Kafka, DB, HTTP)
 * - Pueden delegar a servicios o publicadores que implementen interfaces
 *
 * Este archivo:
 * ✅ Agrupa todos los handlers en el array `EventHandlers`
 * ✅ Exporta cada handler de forma individual (reexportación)
 *
 * Ejemplo de uso en un módulo:
 *
 * ```ts
 * import { EventHandlers } from './application/events'
 *
 * @Module({
 *   providers: [...EventHandlers],
 * })
 * export class ExampleModule {}
 * ```
 */

// 📦 Importar todos los handlers individuales
import { ExampleCreatedEventHandler } from './example-created/example-created-event.handler'
import { ExampleRenamedEventHandler } from './example-renamed/example-renamed-event.handler'
import { ExampleDescriptionUpdatedEventHandler } from './example-description-updated/example-description-updated-event.handler'

/**
 * EventHandlers
 * -----------------------------------------------------------------------------
 * Conjunto de EventHandlers registrados en la aplicación.
 * Escuchan eventos emitidos desde entidades de dominio.
 */
export const EventHandlers = [
  ExampleCreatedEventHandler,
  ExampleRenamedEventHandler,
  ExampleDescriptionUpdatedEventHandler
]

// 📤 Exportación individual (opcional)
export * from './example-created/example-created-event.handler'
export * from './example-renamed/example-renamed-event.handler'
export * from './example-description-updated/example-description-updated-event.handler'
