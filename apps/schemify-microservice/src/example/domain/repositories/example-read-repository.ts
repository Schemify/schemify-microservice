/**
 * ExampleReadRepository
 * -----------------------------------------------------------------------------
 * Interfaz que define el contrato de acceso **de solo lectura** al agregado `ExampleEntity`.
 * Forma parte del patrón de arquitectura **Hexagonal / Ports and Adapters**.
 *
 * Esta interfaz NO contiene operaciones de escritura, y es usada por:
 *  - Queries (Casos de uso de lectura)
 *  - Manejadores de eventos o servicios de reporting
 *
 * 🔹 Implementaciones típicas: Prisma, Mongoose, Sequelize, raw SQL, etc.
 * 🔹 Se usa para desacoplar la capa de aplicación del proveedor de persistencia.
 */

import { ExampleEntity } from '../entities/example.entity'

export abstract class ExampleReadRepository {
  /**
   * Busca un Example por su ID.
   * @param id ID del agregado
   * @returns El agregado si existe, o `null` si no se encuentra.
   */
  abstract findById(id: string): Promise<ExampleEntity | null>

  /**
   * Retorna todos los registros disponibles.
   * 🚨 Solo usar si el volumen de datos lo permite.
   */
  abstract findAll(): Promise<ExampleEntity[]>

  /**
   * Retorna una lista paginada por cursor.
   * Útil para cargas masivas o scroll infinito.
   */
  abstract findWithCursor(
    afterId: string,
    limit: number
  ): Promise<{
    items: ExampleEntity[]
    nextCursor: string | null
    hasMore: boolean
  }>
}
