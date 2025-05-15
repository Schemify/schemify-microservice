import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

import { ExampleCreatedEvent } from '@microservice/schemify-microservice/example/domain/events/example-created.event'
import { CreateExampleCommand } from '@microservice/schemify-microservice/example/application/commands/create-example/create-example.command'

@Injectable()
export class ExampleCreatedEventHandler {
  constructor(private readonly commandBus: CommandBus) {}

  async handle(event: ExampleCreatedEvent) {
    await this.commandBus.execute(
      new CreateExampleCommand(event.name.value, event.description?.value ?? '')
    )
  }
}
