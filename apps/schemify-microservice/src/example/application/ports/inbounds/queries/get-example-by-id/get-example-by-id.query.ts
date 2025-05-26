/**
 * GetExampleByIdQuery
 * -----------------------------------------------------------------------------
 * Query de lectura que solicita un `ExampleEntity` específico por su ID.
 *
 * Este objeto es procesado por el `GetExampleByIdHandler`, quien se encarga de
 * obtener la entidad correspondiente desde el repositorio de solo lectura.
 *
 * Se usa en lectura directa, sin emitir eventos ni modificar el estado.
 */

import { IQuery } from '@nestjs/cqrs'

export class GetExampleByIdQuery implements IQuery {
  constructor(
    /**
     * Payload de la query
     * @property id ID único del Example a buscar
     */
    public readonly payload: { id: string }
  ) {}
}
