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
import { ExampleEntity } from '../entities/example.entity'

export class ExampleCreatedEvent implements IEvent {
  public readonly occurredAt: Date
  public readonly example: ExampleEntity

  constructor(example: ExampleEntity) {
    this.occurredAt = new Date()
    this.example = example
  }
}
