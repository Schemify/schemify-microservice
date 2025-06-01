import { Module } from '@nestjs/common'
import { MessagingModule } from './messaging/messaging.module'
import { RepositoriesModule } from './repositories/repositories.module'

@Module({
  imports: [MessagingModule, RepositoriesModule],
  exports: [MessagingModule, RepositoriesModule]
})
export class OutboundsModule {}
