import { Module } from '@nestjs/common'

// 🔁 Inbound command handlers
import { CommandHandlers } from './inbounds/commands'
import { QueryHandlers } from './inbounds/queries'
import { EventHandlers } from './inbounds/events'

import { RepositoriesModule } from '@microservice/schemify-microservice/example/infrastructure/adapters/outbounds/repositories/repositories.module'

@Module({
  imports: [RepositoriesModule],
  providers: [...CommandHandlers, ...QueryHandlers, ...EventHandlers],
  exports: [...CommandHandlers, ...QueryHandlers, ...EventHandlers]
})
export class PortsModule {}
