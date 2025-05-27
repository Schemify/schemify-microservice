import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'

import { KafkaProducerService } from './producers/kafka-producer.service'
import { kafkaProducerOptions } from './config/producer.config'

@Module({
  imports: [
    ClientsModule.register([
      kafkaProducerOptions({
        name: 'KAFKA_PRODUCER',
        clientId: 'schemify-producer',
        brokers: [process.env.KAFKA_BROKER || 'kafka1:9092']
      })
    ])
  ],
  providers: [KafkaProducerService],
  exports: [KafkaProducerService]
})
export class KafkaProducerModule {}
