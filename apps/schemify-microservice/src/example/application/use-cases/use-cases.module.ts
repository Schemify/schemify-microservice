import { Module } from '@nestjs/common'
import { PrintExampleInfoUseCase } from './messaging/kafka/print-example-info.use-case'
import { OutboundsModule } from '@example//example/infrastructure/adapters/outbounds/outbounds.module'

@Module({
  imports: [OutboundsModule],
  providers: [PrintExampleInfoUseCase],
  exports: [PrintExampleInfoUseCase]
})
export class UseCasesModule {}
