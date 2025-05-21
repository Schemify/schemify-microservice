/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common'

import { InfrastructureModule } from './infrastructure/modules/infrastructure.module'

import { CommandHandlers } from './application/commands'
import { QueryHandlers } from './application/queries'
import { EventHandlers } from './application/events'

import { Logger } from '@nestjs/common'

import { CqrsModule, QueryBus } from '@nestjs/cqrs'

import { Controllers } from './infrastructure/controllers'

@Module({
  imports: [CqrsModule, InfrastructureModule],
  controllers: [...Controllers],
  providers: [...CommandHandlers, ...QueryHandlers, ...EventHandlers]
})
export class ExampleModule {
  private readonly logger = new Logger(ExampleModule.name)

  constructor(private readonly queryBus: QueryBus) {
    this.logger.log('✅ ExampleModule cargado')
    console.log(
      '📦 QueryHandlers:',
      [...this.queryBus['handlers'].keys()].map((h) => h.name)
    )
  }
}
