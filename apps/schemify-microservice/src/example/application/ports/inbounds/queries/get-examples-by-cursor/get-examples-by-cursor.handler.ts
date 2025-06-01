/**
 * GetExamplesByCursorHandler
 * -----------------------------------------------------------------------------
 * Handler que responde a la query `GetExamplesByCursorQuery`.
 *
 * 🔹 Esta clase forma parte de la **capa de aplicación**, implementando el patrón CQRS.
 * 🔹 Coordina la paginación basada en cursor para el agregado `ExampleEntity`.
 *
 * ✨ Responsabilidad:
 *  - Acceder al repositorio de lectura con paginación
 *  - Devolver entidades del dominio (`ExampleEntity[]`) junto a metadata de cursor
 *
 * 🚫 Este handler NO:
 *  - Mapea las entidades a DTOs/Protobuf
 *  - Maneja la lógica de presentación (eso lo hace la infraestructura)
 *
 * 🧠 Justificación arquitectónica:
 *  - Mantiene la lógica de paginación desacoplada del transporte
 *  - Cumple con los principios de separación de intereses (ISO/IEC 42010)
 *  - Compatible con múltiples adaptadores (REST, GraphQL, gRPC)
 *
 * 🔌 Dependencias:
 *  - `GetExamplesWithCursorPort`: puerto de salida del dominio para operaciones de lectura
 */

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetExamplesByCursorQuery } from './get-examples-by-cursor.query'

import { ExampleEntity } from '@example//example/domain/entities/example.entity'

import { GetExamplesWithCursorPort } from '@example//example/application/ports/outbounds/repositories/example-query-ports'
import { Inject } from '@nestjs/common'

@QueryHandler(GetExamplesByCursorQuery)
export class GetExamplesByCursorHandler
  implements IQueryHandler<GetExamplesByCursorQuery>
{
  constructor(
    @Inject(GetExamplesWithCursorPort)
    private readonly getExamplesWithCursorPort: GetExamplesWithCursorPort
  ) {}

  /**
   * Ejecuta la query con paginación basada en cursor.
   *
   * @param query Query con parámetros de paginación (`afterId`, `limit`)
   * @returns Objeto con:
   *  - `items`: lista de entidades
   *  - `nextCursor`: cursor para la siguiente página
   *  - `hasMore`: indicador si hay más datos
   */
  async execute(query: GetExamplesByCursorQuery): Promise<{
    items: ExampleEntity[]
    nextCursor: string | null
    hasMore: boolean
  }> {
    const { afterId, limit } = query.payload

    const result = await this.getExamplesWithCursorPort.getWithCursor(
      afterId,
      limit
    )

    return {
      items: result.items,
      nextCursor: result.nextCursor,
      hasMore: result.hasMore
    }
  }
}
