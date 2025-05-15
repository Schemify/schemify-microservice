import { Injectable } from '@nestjs/common'
import { ExampleCreatedEvent } from '@microservice/schemify-microservice/example/domain/events/example-created.event'

@Injectable()
export class ExampleCreatedEventHandler {
  async handle(event: ExampleCreatedEvent): Promise<void> {
    console.log(
      `[Kafka] Consumed event: ExampleCreatedEvent with ID ${event.id}`
    )
    await Promise.resolve() // ← evita el warning, pero es un parche
  }
}
