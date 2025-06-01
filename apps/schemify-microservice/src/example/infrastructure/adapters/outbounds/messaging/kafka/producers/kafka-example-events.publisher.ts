import { Injectable } from '@nestjs/common'

import { KafkaProducerService } from '../client/kafka-producer.service'

import { ExampleEventPublisherPort } from '@example//example/application/ports/outbounds/messaging/example-event-publisher.port'

import { ExampleCreatedEvent } from '@example//example/domain/events/example-created.event'

@Injectable()
export class KafkaExampleEventsPublisher implements ExampleEventPublisherPort {
  constructor(private readonly kafkaProducer: KafkaProducerService) {}

  async publishCreatedEvent(event: ExampleCreatedEvent): Promise<void> {
    const message = {
      value: JSON.stringify(event)
    }

    await this.kafkaProducer.emit('example.created', message)
  }
}
