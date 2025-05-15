import { Module } from '@nestjs/common'

import { InfrastructureModule } from './infrastructure/modules/infrastructure.module'

// CQRS Handlers
import { CommandHandlers } from './application/commands'
import { QueryHandlers } from './application/queries'
import { KafkaEventHandlers } from './application/events'

@Module({
  imports: [InfrastructureModule],

  providers: [...CommandHandlers, ...QueryHandlers, ...KafkaEventHandlers]
})
export class ExampleModule {}
