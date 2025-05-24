/**
 * GetAllExamplesHandler
 * -----------------------------------------------------------------------------
 * Handler que responde a la query `GetAllExamplesQuery`.
 *
 * 🔹 Esta clase forma parte de la **capa de aplicación**, implementando el patrón CQRS.
 * 🔹 Orquesta la recuperación de todos los `ExampleEntity` desde el puerto de lectura.
 *
 * ✨ Responsabilidad:
 *  - Invocar el repositorio de solo lectura (`ExampleReadRepository`)
 *  - Devolver una lista de entidades completas del dominio
 *  - No contiene lógica de presentación ni mapeos a DTOs
 *
 * 🚫 Este handler NO:
 *  - Mapea entidades a objetos de transporte (DTOs, Protobuf, HTTP)
 *  - Accede directamente a infraestructura (ORM, base de datos)
 *  - Define filtros o paginación (usar otra query para eso)
 *
 * 🧠 Justificación arquitectónica:
 *  - Mantiene la separación de intereses (ISO/IEC 42010)
 *  - Respeta los principios de la arquitectura hexagonal (ports & adapters)
 *  - Facilita testing, evolución y desacoplamiento
 *
 * 🔌 Dependencias:
 *  - `ExampleReadRepository`: puerto de salida del dominio
 */

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetAllExamplesQuery } from './get-all-examples.query'

import { ExampleEntity } from '@microservice/schemify-microservice/example/domain/entities/example.entity'
import { ExampleReadRepository } from '@microservice/schemify-microservice/example/domain/repositories/example-read-repository'

@QueryHandler(GetAllExamplesQuery)
export class GetAllExamplesHandler
  implements IQueryHandler<GetAllExamplesQuery>
{
  constructor(private readonly readRepository: ExampleReadRepository) {}

  /**
   * Ejecuta la query `GetAllExamplesQuery`.
   *
   * @returns Lista de entidades del dominio `ExampleEntity[]`
   */
  async execute(): Promise<ExampleEntity[]> {
    return this.readRepository.findAll()
  }
}
