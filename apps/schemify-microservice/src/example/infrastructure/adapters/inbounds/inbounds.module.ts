import { Module } from '@nestjs/common'

import { GrpcServerModule } from './grpc/grpc-server.module'
import { KafkaConsumerModule } from './kafka/kafka-consumer.module'

@Module({
  imports: [GrpcServerModule, KafkaConsumerModule]
})
export class InboundsModule {}
