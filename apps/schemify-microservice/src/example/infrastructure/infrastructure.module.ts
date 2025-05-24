import { Module } from '@nestjs/common'

import { KafkaModule } from './messaging/kafka/kafka.module'

@Module({
  imports: [KafkaModule],
  providers: [],
  exports: []
})
export class InfrastructureModule {}
