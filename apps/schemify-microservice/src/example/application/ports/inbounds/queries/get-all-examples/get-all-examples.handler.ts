/**
 * GetAllExamplesHandler
 * -----------------------------------------------------------------------------
 * Handler que responde a la query `GetAllExamplesQuery`.
 *
 * 🔹 Esta clase forma parte de la **capa de aplicación**, implementando el patrón CQRS.
 * 🔹 Orquesta la recuperación de todos los `ExampleEntity` desde el puerto de lectura.
 *
 * ✨ Responsabilidad:
 *  - Invocar el repositorio de solo lectura (`GetAllExamplesPort`)
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
 *  - `GetAllExamplesPort`: puerto de salida del dominio
 */

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { ExampleEntity } from '@example/example/domain/entities/example.entity'

import { GetAllExamplesPort } from '@example/example/application/ports/outbounds/repositories/example-query-ports'
import { GetAllExamplesQuery } from './get-all-examples.query'
import { Inject } from '@nestjs/common'

@QueryHandler(GetAllExamplesQuery)
export class GetAllExamplesHandler
  implements IQueryHandler<GetAllExamplesQuery>
{
  constructor(
    @Inject(GetAllExamplesPort)
    private readonly getAllExamplePort: GetAllExamplesPort
  ) {}

  /**
   * Ejecuta la query `GetAllExamplesQuery`.
   *
   * @returns Lista de entidades del dominio `ExampleEntity[]`
   */
  async execute(): Promise<ExampleEntity[]> {
    return this.getAllExamplePort.getAll()
  }
}
