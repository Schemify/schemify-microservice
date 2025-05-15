import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'

import { KafkaProducers } from './producers'
import { KafkaConsumers } from './consumers'

import { KafkaEventHandlers } from '@microservice/schemify-microservice/example/application/events'
import { kafkaProducerOptions } from './config/kafka-factory.config'

@Module({
  imports: [
    // Kafka para producir mensajes
    ClientsModule.register([
      kafkaProducerOptions('KAFKA_PRODUCER', 'schemify-producer', [
        process.env.KAFKA_BROKER || 'localhost:9092'
      ])
    ])
  ],
  controllers: [...KafkaConsumers],
  providers: [...KafkaProducers, ...KafkaEventHandlers],
  exports: [...KafkaProducers]
})
export class KafkaModule {}
