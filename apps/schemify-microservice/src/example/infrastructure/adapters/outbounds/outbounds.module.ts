import { Module } from '@nestjs/common'
import { MessagingOutboundsModule } from './messaging/messaging.module'
import { RepositoriesModule } from './repositories/repositories.module'

@Module({
  imports: [MessagingOutboundsModule, RepositoriesModule],
  exports: [MessagingOutboundsModule, RepositoriesModule]
})
export class OutboundsModule {}
