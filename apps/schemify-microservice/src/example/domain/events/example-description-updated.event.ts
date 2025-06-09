/**
 * ExampleDescriptionUpdatedEvent
 * -----------------------------------------------------------------------------
 * Evento de dominio que indica que la descripción de un `ExampleEntity` fue modificada.
 *
 * Es emitido desde el método `update()` si la descripción cambia.
 *
 * Casos de uso típicos:
 *  - Actualizar descripciones en sistemas de búsqueda
 *  - Replicar cambios a vistas de lectura o motores de indexado
 *  - Registrar historial de cambios
 */

import { IEvent } from '@nestjs/cqrs'
import { DescriptionValueObject } from '../value-objects/description.value-object'

export class ExampleDescriptionUpdatedEvent implements IEvent {
  constructor(
    public readonly id: string,
    public readonly newDescription: DescriptionValueObject
  ) {}
}
