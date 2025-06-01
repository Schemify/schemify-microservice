import { Module } from '@nestjs/common'

import { AdaptersModule } from './adapters/adapters.module'

@Module({
  imports: [AdaptersModule],
  exports: [AdaptersModule]
})
export class InfrastructureModule {}
