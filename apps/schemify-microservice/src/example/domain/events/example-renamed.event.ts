import { IEvent } from '@nestjs/cqrs'
import { NameValueObject } from '../value-objects/name.value-object'

/**
 * ExampleRenamedEvent
 * -----------------------------------------------------------------------------
 * Evento de dominio que indica que el nombre de un `ExampleEntity` fue modificado.
 *
 * Es emitido desde el método `update()` si el nombre cambia.
 *
 * Casos de uso típicos:
 *  - Actualizar vistas o proyecciones
 *  - Registrar auditoría de cambios
 *  - Notificar a otros contextos interesados
 */
export class ExampleRenamedEvent implements IEvent {
  constructor(
    public readonly id: string,
    public readonly newName: NameValueObject
  ) {}
}
