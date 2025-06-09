import { Module } from '@nestjs/common'

import { KafkaProducerModule } from './kafka/kafka-producer.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [KafkaProducerModule, PrismaModule],
  exports: [KafkaProducerModule, PrismaModule]
})
export class OutboundsModule {}
