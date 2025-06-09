/**
 * GetAllExamplesQuery
 * -----------------------------------------------------------------------------
 * Query de lectura (CQRS) para obtener todos los registros `ExampleEntity`.
 *
 * No requiere parámetros.
 *
 * Es manejada por `GetAllExamplesHandler`, quien delega al repositorio
 * correspondiente y transforma los datos si es necesario.
 */

import { IQuery } from '@nestjs/cqrs'

export class GetAllExamplesQuery implements IQuery {
  constructor() {}
}
