/**
 * Punto de entrada para la capa de **queries** (CQRS).
 *
 * Expone todas las queries y sus respectivos handlers como módulos reutilizables.
 * También exporta un arreglo `QueryHandlers` que puede ser registrado directamente
 * en el módulo principal (`@Module`) para cargar el QueryBus de NestJS.
 *
 * Uso recomendado:
 *
 * ```ts
 * import { QueryHandlers } from './application/queries'
 *
 * @Module({
 *   providers: [...QueryHandlers],
 * })
 * export class ExampleModule {}
 * ```
 *
 * Incluye:
 * - GetAllExamplesQuery / Handler
 * - GetExampleByIdQuery / Handler
 * - GetExamplesByCursorQuery / Handler
 */

// 📤 Re-exportación directa (para importación individual si se desea)
export * from './get-all-examples/get-all-examples.handler'
export * from './get-all-examples/get-all-examples.query'
export * from './get-example-by-id/get-example-by-id.handler'
export * from './get-example-by-id/get-example-by-id.query'
export * from './get-examples-by-cursor/get-examples-by-cursor.handler'
export * from './get-examples-by-cursor/get-examples-by-cursor.query'

// 📦 Arreglo centralizado de todos los handlers de queries
import { GetAllExamplesHandler } from './get-all-examples/get-all-examples.handler'
import { GetExampleByIdHandler } from './get-example-by-id/get-example-by-id.handler'
import { GetExamplesByCursorHandler } from './get-examples-by-cursor/get-examples-by-cursor.handler'

/**
 * Conjunto de handlers registrados por NestJS en el QueryBus
 */
export const QueryHandlers = [
  GetAllExamplesHandler,
  GetExampleByIdHandler,
  GetExamplesByCursorHandler
]
