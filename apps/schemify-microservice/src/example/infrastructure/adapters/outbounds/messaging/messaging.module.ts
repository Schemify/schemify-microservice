import { Module } from '@nestjs/common'
import { KafkaProducerModule } from './kafka/kafka-producer.module'
import { KafkaExampleEventsPublisher } from './kafka/producers/kafka-example-events.publisher'
import { ExampleEventPublisherPort } from '@example//example/application/ports/outbounds/messaging/example-event-publisher.port'

@Module({
  imports: [KafkaProducerModule],
  providers: [
    {
      provide: ExampleEventPublisherPort,
      useClass: KafkaExampleEventsPublisher
    }
  ],
  exports: [ExampleEventPublisherPort]
})
export class MessagingModule {}
