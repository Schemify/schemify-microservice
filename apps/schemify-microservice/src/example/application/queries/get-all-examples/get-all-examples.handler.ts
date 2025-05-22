/**
 * GetAllExamplesHandler
 * -----------------------------------------------------------------------------
 * Handler para la query `GetAllExamplesQuery`.
 *
 * Se encarga de:
 *  - Leer todos los `ExampleEntity` desde el repositorio de solo lectura
 *  - Convertir los datos a DTO/proto para ser devueltos por la capa de transporte
 *
 * Esta clase forma parte de la **capa de aplicación**, siguiendo el patrón CQRS.
 *
 * Flujo de ejecución:
 *
 * 1. Client envía `GetAllExamplesQuery`
 * 2. QueryBus ejecuta este Handler
 * 3. Se accede al repositorio de solo lectura
 * 4. Se obtienen entidades `ExampleEntity`
 * 5. Se transforman a DTO (`example.Example`) vía mapper
 * 6. Se retornan al cliente desde el transport layer (gRPC/REST)
 *
 * Dependencias:
 * - `ExampleReadRepository`: acceso de solo lectura al dominio
 * - `ExampleMapper`: convierte entidades a objetos de salida (DTO/Protobuf)
 */

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'

import { example } from '@app/proto'

import { GetAllExamplesQuery } from './get-all-examples.query'

import { ExampleReadRepository } from '@microservice/schemify-microservice/example/domain/repositories/example-read-repository'
import { ExampleMapper } from '@microservice/schemify-microservice/example/application/mappers/example.mapper'

@QueryHandler(GetAllExamplesQuery)
export class GetAllExamplesHandler
  implements IQueryHandler<GetAllExamplesQuery>
{
  constructor(
    @Inject('ExampleReadRepository')
    private readonly readRepository: ExampleReadRepository,

    private readonly mapper: ExampleMapper
  ) {}

  /**
   * Ejecuta la query: obtiene todos los registros `ExampleEntity` y los mapea a DTO.
   *
   * @returns Lista de objetos en formato `example.Example` (protobuf)
   */
  async execute(): Promise<example.Example[]> {
    const entities = await this.readRepository.findAll()
    return entities.map((entity) => this.mapper.entityToProto(entity))
  }
}
