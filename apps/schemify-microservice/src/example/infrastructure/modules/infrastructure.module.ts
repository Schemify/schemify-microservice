import { Module } from '@nestjs/common'

import { ExampleMapper } from '@microservice/schemify-microservice/example/application/mappers/example.mapper'
import { PrismaExampleRepository } from '../persistence/prisma/repositories/example-prisma.repository'
import { PrismaModule } from '../persistence/prisma/prisma.module'
import { KafkaModule } from '../messaging/kafka/kafka.module'

@Module({
  imports: [PrismaModule, KafkaModule],
  providers: [
    ExampleMapper,
    {
      provide: 'ExampleRepository',
      useClass: PrismaExampleRepository
    }
  ],
  exports: ['ExampleRepository', ExampleMapper]
})
export class InfrastructureModule {}
