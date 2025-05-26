// ! En caso de un false positivo de eslint, esta regla se desactiva para este archivo
/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */

/**
 * ExampleCreatedEventHandler
 * -----------------------------------------------------------------------------
 * Handler que escucha el evento `ExampleCreatedEvent` emitido desde el dominio.
 *
 * Este evento se dispara desde la entidad `ExampleEntity` cuando se invoca
 * `this.apply(new ExampleCreatedEvent(...))` y se ejecuta `entity.commit()`.
 *
 * Flujo completo:
 * 1. Se ejecuta un comando (ej: CreateExampleCommand)
 * 2. El handler del comando llama: ExampleEntity.create(...)
 * 3. Dentro de create(), se aplica: this.apply(new ExampleCreatedEvent(...))
 * 4. Luego, se ejecuta: entity.commit()
 * 5. NestJS EventBus dispara automáticamente este EventHandler
 * 6. Este handler procesa el evento (`handle()`) → publica en Kafka, etc.
 */

import { Injectable } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import { ExampleCreatedEvent } from '@microservice/schemify-microservice/example/domain/events/example-created.event'

@EventsHandler(ExampleCreatedEvent)
@Injectable()
export class ExampleCreatedEventHandler
  implements IEventHandler<ExampleCreatedEvent>
{
  /**
   * Método que maneja el evento cuando es publicado por el `EventBus`
   *
   * @param event Evento emitido desde el dominio (ExampleEntity)
   */
  async handle(event: ExampleCreatedEvent): Promise<void> {
    console.log(
      `[Kafka] ✅ Consumed event: ExampleCreatedEvent with ID ${event.id}`
    )

    // Simula trabajo asincrónico (parche temporal para evitar warnings)
    await Promise.resolve()
  }
}
