import { Module } from '@nestjs/common'
import { KafkaConsumers } from './consumers'
import { KafkaOptions, Transport } from '@nestjs/microservices'
import { ApplicationModule } from '@microservice/schemify-microservice/example/application/application.module'

@Module({
  imports: [ApplicationModule],
  providers: [...KafkaConsumers]
})
export class KafkaConsumerModule {
  static transport(config: {
    clientId: string
    groupId: string
    brokers: string[]
  }): KafkaOptions {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: config.clientId,
          brokers: config.brokers,
          connectionTimeout: 5000,
          requestTimeout: 3000,
          retry: {
            maxRetryTime: 60000,
            initialRetryTime: 1000,
            retries: 10
          }
        },
        consumer: {
          groupId: config.groupId,
          allowAutoTopicCreation: false
        },
        subscribe: {
          fromBeginning: true
        },
        run: {
          autoCommit: false,
          partitionsConsumedConcurrently: 3
        }
      }
    }
  }
}
