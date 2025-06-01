import { Module } from '@nestjs/common'
import { ExampleMapper } from '../../example/infrastructure/mappers/example.mapper'

@Module({
  providers: [ExampleMapper],
  exports: [ExampleMapper]
})
export class SharedModule {}
