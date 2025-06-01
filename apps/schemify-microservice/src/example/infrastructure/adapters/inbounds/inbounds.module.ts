import { Module } from '@nestjs/common'

import { GrpcServerModule } from './grpc/grpc-server.module'
import { MessagingInboundsModule } from './messaging/messaging.module'

@Module({
  imports: [MessagingInboundsModule, GrpcServerModule]
})
export class InboundsModule {}
