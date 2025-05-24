import { Module } from '@nestjs/common'
import { ExampleMapper } from './mappers/example.mapper'

@Module({
  providers: [ExampleMapper],
  exports: [ExampleMapper]
})
export class SharedModule {}
