/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */
import { Injectable } from '@nestjs/common'

import { KafkaProducerService } from '../client/kafka-producer.service'

import { ExampleEventPublisherPort } from '@example/example/application/ports/outbounds/messaging/example-event-publisher.port'

import { ExampleCreatedEvent } from '@example/example/domain/events/example-created.event'

import { Envelope } from '@example/libs/shared/events/event-envelope'

@Injectable()
export class KafkaExampleEventsPublisher implements ExampleEventPublisherPort {
  constructor(private readonly kafkaProducer: KafkaProducerService) {}

  async publishCreatedEvent(evt: ExampleCreatedEvent) {
    const message: Envelope<ExampleCreatedEvent> = {
      type: 'ExampleCreated',
      version: 1,
      payload: evt
    }
    await this.kafkaProducer.emit('example.created', {
      key: evt.example.id,
      value: JSON.stringify(message)
    })
  }
}
