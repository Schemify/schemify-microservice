import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'

import { KafkaProducers } from './producers'
import { KafkaConsumers } from '../../../inbounds/messaging/kafka/consumers'

import { EventHandlers } from '@microservice/schemify-microservice/example/application/ports/inbounds/events'
import { kafkaProducerOptions } from './config/kafka-factory.config'

@Module({
  imports: [
    // Kafka para producir mensajes
    ClientsModule.register([
      kafkaProducerOptions('KAFKA_PRODUCER', 'schemify-producer', [
        process.env.KAFKA_BROKER || 'kafka1:9092'
      ])
    ])
  ],
  controllers: [...KafkaConsumers],
  providers: [...KafkaProducers, ...EventHandlers],
  exports: [...KafkaProducers]
})
export class KafkaModule {}
