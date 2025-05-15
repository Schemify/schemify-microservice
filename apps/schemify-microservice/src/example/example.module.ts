import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { ExampleInfrastructureModule } from './infrastructure/modules/example.module'

// CQRS Handlers
import { CommandHandlers } from './application/commands'
import { QueryHandlers } from './application/queries'
import { EventHandlers } from './application/events'

@Module({
  imports: [CqrsModule, ExampleInfrastructureModule],
  controllers: [],
  providers: [...CommandHandlers, ...QueryHandlers, ...EventHandlers],
  exports: []
})
export class ExampleModule {}
