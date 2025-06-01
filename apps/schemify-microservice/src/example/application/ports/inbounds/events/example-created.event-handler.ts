import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import { ExampleCreatedEvent } from '@example//example/domain/events/example-created.event'
import { PrintExampleInfoUseCase } from '@example//example/application/use-cases/messaging/kafka/print-example-info.use-case'

@EventsHandler(ExampleCreatedEvent)
export class ExampleCreatedEventHandler
  implements IEventHandler<ExampleCreatedEvent>
{
  constructor(private readonly useCase: PrintExampleInfoUseCase) {}

  async handle(event: ExampleCreatedEvent): Promise<void> {
    await this.useCase.execute(event)
  }
}
