import { Module } from '@nestjs/common'
import { KafkaProducerModule } from './kafka/kafka-producer.module'

@Module({
  imports: [KafkaProducerModule],
  exports: [KafkaProducerModule]
})
export class MessagingOutboundsModule {}
