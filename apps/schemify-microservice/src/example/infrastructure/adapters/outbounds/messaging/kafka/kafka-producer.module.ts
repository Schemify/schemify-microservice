import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'

import { KafkaProducerService } from './client/kafka-producer.service'
import { kafkaProducerOptions } from './config/producer.config'

@Module({
  imports: [
    ClientsModule.register([
      kafkaProducerOptions({
        name: 'KAFKA_PRODUCER',
        clientId: 'schemify-producer',
        brokers: ['kafka1:9092']
      })
    ])
  ],
  providers: [KafkaProducerService],
  exports: [KafkaProducerService]
})
export class KafkaProducerModule {}
