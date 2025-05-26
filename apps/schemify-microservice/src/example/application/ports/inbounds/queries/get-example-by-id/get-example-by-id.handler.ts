/**
 * GetExampleByIdHandler
 * -----------------------------------------------------------------------------
 * Handler que responde a la query `GetExampleByIdQuery`.
 *
 * 🔹 Esta clase forma parte de la **capa de aplicación**, implementando el patrón CQRS.
 * 🔹 Su responsabilidad es recuperar un agregado `ExampleEntity` por su ID.
 *
 * ✨ Responsabilidad:
 *  - Acceder al repositorio de solo lectura (`ExampleReadRepository`)
 *  - Devolver una instancia completa del dominio (`ExampleEntity`)
 *  - En caso de no encontrar el agregado, retornar `null`
 *
 * 🚫 Este handler NO:
 *  - Mapea la entidad a DTOs/Protobuf
 *  - Define detalles de presentación o transporte
 *
 * 🧠 Justificación arquitectónica:
 *  - Mantiene la lógica de negocio y el acceso desacoplado de la infraestructura
 *  - Permite que los adaptadores (gRPC/REST/etc.) manejen la presentación y errores
 *  - Facilita testing y mantiene el dominio puro
 *
 * 🔌 Dependencias:
 *  - `ExampleReadRepository`: puerto de salida para acceso de solo lectura
 */

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetExampleByIdQuery } from './get-example-by-id.query'

import { ExampleReadRepository } from '@microservice/schemify-microservice/example/domain/ports/outbounds/example-read-repository'
import { ExampleEntity } from '@microservice/schemify-microservice/example/domain/entities/example.entity'

@QueryHandler(GetExampleByIdQuery)
export class GetExampleByIdHandler
  implements IQueryHandler<GetExampleByIdQuery>
{
  constructor(private readonly readRepository: ExampleReadRepository) {}

  /**
   * Ejecuta la query `GetExampleByIdQuery`.
   *
   * @param query Objeto con el ID del agregado a buscar
   * @returns `ExampleEntity` si se encuentra, o `null` si no existe
   */
  async execute(query: GetExampleByIdQuery): Promise<ExampleEntity | null> {
    return this.readRepository.findById(query.payload.id)
  }
}
