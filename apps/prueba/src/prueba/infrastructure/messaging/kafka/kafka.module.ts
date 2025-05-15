import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { KafkaProducerService } from './producers/kafka-producer.service'
import { PruebaCreatedConsumer } from './consumers/prueba-created.consumer'

import { kafkaCommonConfig } from '../../config/kafka.config'

import { PruebaCreatedUseCase } from '../../../application/use-cases/create-prueba.use-case'
import { Partitioners } from 'kafkajs'

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
  controllers: [PruebaCreatedConsumer],
  providers: [KafkaProducerService, PruebaCreatedUseCase],
  exports: [KafkaProducerService]
})
export class KafkaModule {}
