/**
 * GetExampleByIdHandler
 * -----------------------------------------------------------------------------
 * Handler para la query `GetExampleByIdQuery`.
 *
 * Se encarga de:
 * - Buscar un `ExampleEntity` por su ID
 * - Lanzar excepción si no existe
 * - Convertir la entidad a un DTO/proto antes de devolverla
 *
 * Esta clase forma parte de la **capa de aplicación**, y sigue el patrón **CQRS**.
 *
 * Flujo de ejecución:
 * 1. Client envía `GetExampleByIdQuery` con el `id`
 * 2. QueryBus ejecuta este Handler
 * 3. El Handler accede al `ExampleReadRepository`
 * 4. Si existe, transforma la entidad en DTO usando `ExampleMapper`
 * 5. Devuelve el DTO (ej: `example.Example`) a la capa de transporte
 *
 * Dependencias:
 * - `ExampleReadRepository`: acceso de solo lectura al agregado
 * - `ExampleMapper`: transforma entidad a DTO (proto)
 */

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Inject, NotFoundException } from '@nestjs/common'

import { example } from '@app/proto'

import { GetExampleByIdQuery } from './get-example-by-id.query'

import { ExampleReadRepository } from '@microservice/schemify-microservice/example/domain/repositories/ExampleReadRepository'
import { ExampleMapper } from '@microservice/schemify-microservice/example/application/mappers/example.mapper'

@QueryHandler(GetExampleByIdQuery)
export class GetExampleByIdHandler
  implements IQueryHandler<GetExampleByIdQuery>
{
  constructor(
    @Inject('ExampleReadRepository')
    private readonly readRepository: ExampleReadRepository,
    private readonly mapper: ExampleMapper
  ) {}

  /**
   * Ejecuta la query para obtener un Example por ID.
   *
   * @param query Query con el ID solicitado
   * @returns Objeto DTO/proto (`example.Example`) si se encuentra
   * @throws NotFoundException si el ID no existe
   */
  async execute(query: GetExampleByIdQuery): Promise<example.Example> {
    const entity = await this.readRepository.findById(query.payload.id)

    if (!entity) {
      throw new NotFoundException(
        `Example with id ${query.payload.id} not found`
      )
    }

    return this.mapper.entityToProto(entity)
  }
}
