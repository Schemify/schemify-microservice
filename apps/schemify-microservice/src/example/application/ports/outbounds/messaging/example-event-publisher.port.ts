import { ExampleCreatedEvent } from '@example/example/domain/events/example-created.event'

export abstract class ExampleEventPublisherPort {
  abstract publishCreatedEvent(event: ExampleCreatedEvent): Promise<void>
}
