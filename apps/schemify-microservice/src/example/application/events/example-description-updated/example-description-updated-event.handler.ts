// ! En caso de un false positivo de eslint, esta regla se desactiva para este archivo
/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */

/**
 * Escucha el evento `ExampleDescriptionUpdatedEvent` emitido desde `ExampleEntity`.
 *
 * Se dispara cuando se cambia la descripción mediante `example.update(...)`
 * y luego se hace `example.commit()`.
 *
 * Flujo:
 * 1. Se ejecuta UpdateExampleCommand
 * 2. Se llama a entity.update()
 * 3. Si cambia la descripción, se emite ExampleDescriptionUpdatedEvent
 * 4. Este handler es ejecutado por el EventBus
 */

import { Injectable } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import { ExampleDescriptionUpdatedEvent } from '@microservice/schemify-microservice/example/domain/events/example-description-updated.event'

@EventsHandler(ExampleDescriptionUpdatedEvent)
@Injectable()
export class ExampleDescriptionUpdatedEventHandler
  implements IEventHandler<ExampleDescriptionUpdatedEvent>
{
  async handle(event: ExampleDescriptionUpdatedEvent): Promise<void> {
    console.log(
      `[Kafka] 📝 Descripción actualizada para ID ${event.id}: ${event.newDescription.value}`
    )
    await Promise.resolve()
  }
}
