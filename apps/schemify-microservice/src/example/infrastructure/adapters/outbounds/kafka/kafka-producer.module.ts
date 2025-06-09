import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'

import { KafkaProducerService } from './client/kafka-producer.service'

import { KafkaExampleEventsPublisher } from '../kafka/producers/kafka-example-events.publisher'
import { ExampleEventPublisherPort } from '@example/example/application/ports/outbounds/messaging/example-event-publisher.port'
import { buildKafkaProducerOptions } from '@example/libs/shared/config/kafka/kafka.config'

@Module({
  imports: [
    ClientsModule.register([
      buildKafkaProducerOptions({
        clientId: 'schemify-producer',
        brokers: ['kafka1:9092']
      })
    ])
  ],
  providers: [
    KafkaProducerService,
    {
      provide: ExampleEventPublisherPort,
      useClass: KafkaExampleEventsPublisher
    }
  ],
  exports: [KafkaProducerService, ExampleEventPublisherPort]
})
export class KafkaProducerModule {}
