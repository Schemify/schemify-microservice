import { Module } from '@nestjs/common'
import { InboundsModule } from './inbounds/inbounds.module'
import { OutboundsModule } from './outbounds/outbounds.module'

@Module({
  imports: [InboundsModule, OutboundsModule],
  exports: [InboundsModule, OutboundsModule]
})
export class AdaptersModule {}
