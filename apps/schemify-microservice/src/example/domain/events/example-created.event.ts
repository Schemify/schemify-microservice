/**
 * ExampleCreatedEvent
 * -----------------------------------------------------------------------------
 * Evento de dominio que representa la creación exitosa de un nuevo `ExampleEntity`.
 *
 * Es emitido dentro del método `ExampleEntity.create()`.
 *
 * Este evento puede ser utilizado para:
 *  - Auditar la creación de recursos
 *  - Disparar integraciones externas
 *  - Notificar a otras partes del sistema (proyecciones, otros microservicios)
 *  - Iniciar flujos secundarios o comandos relacionados
 *  - Disparar lógica reactiva (envío de emails, logging, etc.)
 */

import { IEvent } from '@nestjs/cqrs'
import { NameValueObject } from '../value-objects/name.value-object'
import { DescriptionValueObject } from '../value-objects/description.value-object'

export class ExampleCreatedEvent implements IEvent {
  constructor(
    public readonly id: string,
    public readonly name: NameValueObject,
    public readonly description?: DescriptionValueObject
  ) {}
}
