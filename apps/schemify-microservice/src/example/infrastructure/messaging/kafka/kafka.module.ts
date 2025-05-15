import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { KafkaProducerService } from './producers/kafka-producer.service'
import { ExampleCreatedConsumer } from './consumers'

import { kafkaCommonConfig } from '../../config/kafka.config'

import { Partitioners } from 'kafkajs'

import { ConsumerHandlers } from '@/application/example/consumers'

@Module({
  imports: [
    // Kafka para producir mensajes
    ClientsModule.register([
      {
        name: 'KAFKA_PRODUCER',
        transport: Transport.KAFKA,
        options: {
          ...kafkaCommonConfig,
          producer: {
            allowAutoTopicCreation: true,
            idempotent: true,
            createPartitioner: Partitioners.LegacyPartitioner,
            retry: { retries: 3 }
          }
        }
      }
    ])
  ],
  controllers: [ExampleCreatedConsumer],
  providers: [KafkaProducerService],
  exports: [KafkaProducerService]
})
export class KafkaModule {}
