import { Module } from '@nestjs/common'
import { KafkaConsumers } from './consumers'
import { KafkaOptions } from '@nestjs/microservices'
import { ApplicationModule } from '@example/example/application/application.module'
import { buildKafkaConsumerOptions } from '@example/libs/shared/config/kafka/kafka.config'

@Module({
  imports: [ApplicationModule],
  controllers: [...KafkaConsumers]
})
export class KafkaConsumerModule {
  static transport(): KafkaOptions {
    return buildKafkaConsumerOptions({
      clientId: 'schemify-consumer',
      groupId: 'example-group',
      brokers: ['kafka1:9092']
    })
  }
}
