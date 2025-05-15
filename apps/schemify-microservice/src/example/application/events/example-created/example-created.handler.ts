import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { ExampleCreatedEvent } from '../../domain/events/example-created.event'
import { KafkaProducerService } from '@/infrastructure/messaging/kafka/kafka-producer.service'

@EventsHandler(ExampleCreatedEvent)
export class ExampleCreatedHandler
  implements IEventHandler<ExampleCreatedEvent>
{
  constructor(private readonly kafka: KafkaProducerService) {}

  async handle(event: ExampleCreatedEvent) {
    await this.kafka.emit('example-created', {
      id: event.id,
      name: event.name.value,
      description: event.description?.value ?? null,
      occurredAt: event.occurredAt.toISOString()
    })
  }
}
