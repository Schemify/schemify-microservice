/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */
/* eslint-disable @darraghor/nestjs-typed/controllers-should-supply-api-tags */
import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { ExampleCreatedEvent } from '@microservice/schemify-microservice/example/domain/events/example-created.event'
import { ExampleCreatedEventHandler } from '@microservice/schemify-microservice/example/application/ports/inbounds/events'

@Controller()
export class ExampleCreatedConsumer {
  constructor(private readonly handler: ExampleCreatedEventHandler) {}

  @MessagePattern('example-created')
  async consume(@Payload() message: ExampleCreatedEvent) {
    await this.handler.handle(message)
  }
}
