import { Module } from '@nestjs/common'

import { AdaptersModule } from './adapters/adapters.module'
@Module({
  imports: [AdaptersModule]
})
export class InfrastructureModule {}
