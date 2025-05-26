// ! En caso de un false positivo de eslint, esta regla se desactiva para este archivo
/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */

/**
 * Escucha el evento `ExampleRenamedEvent` emitido desde la entidad `ExampleEntity`.
 *
 * Se dispara cuando se cambia el nombre mediante `example.rename(...)`
 * y luego se hace `example.commit()`.
 *
 * Flujo:
 * 1. Se ejecuta UpdateExampleCommand
 * 2. Se llama a entity.update()
 * 3. Si cambia el nombre, se emite ExampleRenamedEvent
 * 4. Este handler es ejecutado automáticamente por el EventBus
 */

import { Injectable } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import { ExampleRenamedEvent } from '@microservice/schemify-microservice/example/domain/events/example-renamed.event'

@EventsHandler(ExampleRenamedEvent)
@Injectable()
export class ExampleRenamedEventHandler
  implements IEventHandler<ExampleRenamedEvent>
{
  async handle(event: ExampleRenamedEvent): Promise<void> {
    console.log(
      `[Kafka] 📝 Nombre actualizado para ID ${event.id}: ${event.newName.value}`
    )
    await Promise.resolve() // evita warning si no es async
  }
}
