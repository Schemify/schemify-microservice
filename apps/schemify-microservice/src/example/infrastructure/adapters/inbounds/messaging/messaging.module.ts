import { Module } from '@nestjs/common'
import { KafkaConsumerModule } from './kafka/kafka-consumer.module'

@Module({
  imports: [KafkaConsumerModule]
})
export class MessagingInboundsModule {}
