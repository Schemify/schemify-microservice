import { Module } from '@nestjs/common'

import { KafkaModule } from './messaging/kafka/kafka.module'
import { RepositoriesModule } from './repositories/repositories.module'

import { ExampleMapper } from '@microservice/schemify-microservice/example/application/mappers/example.mapper'

import { ApplicationModule } from '@microservice/schemify-microservice/example/application/application.module'

@Module({
  imports: [KafkaModule, RepositoriesModule, ApplicationModule],
  providers: [ExampleMapper],
  exports: [ExampleMapper, 'ExampleReadRepository', 'ExampleWriteRepository']
})
export class InfrastructureModule {}
