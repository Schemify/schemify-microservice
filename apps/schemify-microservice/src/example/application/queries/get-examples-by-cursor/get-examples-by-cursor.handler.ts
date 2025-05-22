/**
 * GetExamplesByCursorHandler
 * -----------------------------------------------------------------------------
 * Handler para la query `GetExamplesByCursorQuery`.
 *
 * Se encarga de:
 * - Obtener una lista paginada de `ExampleEntity` desde el repositorio
 * - Convertir las entidades a objetos proto (DTO)
 * - Retornar estructura con `items`, `nextCursor`, `hasMore`
 *
 * Esta clase forma parte de la **capa de aplicación**, implementando el patrón **CQRS**.
 *
 * Flujo de ejecución:
 * 1. El cliente envía `GetExamplesByCursorQuery` con afterId y limit
 * 2. QueryBus ejecuta este Handler
 * 3. El Handler accede al `ExampleReadRepository` usando paginación
 * 4. Las entidades son transformadas vía `ExampleMapper`
 * 5. Se retorna el resultado paginado con objetos DTO y cursor
 *
 * Dependencias:
 * - `ExampleReadRepository`: repositorio de solo lectura
 * - `ExampleMapper`: transforma entidad a DTO (proto)
 */

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'

import { example } from '@app/proto'

import { GetExamplesByCursorQuery } from './get-examples-by-cursor.query'

import { ExampleReadRepository } from '@microservice/schemify-microservice/example/domain/repositories/example-read-repository'
import { ExampleMapper } from '@microservice/schemify-microservice/example/application/mappers/example.mapper'

@QueryHandler(GetExamplesByCursorQuery)
export class GetExamplesByCursorHandler
  implements IQueryHandler<GetExamplesByCursorQuery>
{
  constructor(
    @Inject('ExampleReadRepository')
    private readonly readRepository: ExampleReadRepository,

    private readonly mapper: ExampleMapper
  ) {}

  /**
   * Ejecuta la query con paginación basada en cursor.
   *
   * @param query Query con parámetros de paginación
   * @returns Objeto con lista de items, cursor siguiente y bandera `hasMore`
   */
  async execute(query: GetExamplesByCursorQuery): Promise<{
    items: example.Example[]
    nextCursor: string | null
    hasMore: boolean
  }> {
    const { afterId, limit } = query.payload

    const { items, nextCursor, hasMore } =
      await this.readRepository.findWithCursor(afterId, limit)

    return {
      items: items.map((entity) => this.mapper.entityToProto(entity)),
      nextCursor,
      hasMore
    }
  }
}
