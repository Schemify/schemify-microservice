import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'

// ✅ Puerto de salida (dominio)
import { ExampleWriteRepository } from '@microservice/schemify-microservice/example/domain/ports/outbounds/example-write.repository'
import { ExampleReadRepository } from '@microservice/schemify-microservice/example/domain/ports/outbounds/example-read-repository'

// ✅ Adaptadores de salida (infraestructura)
import { ExampleWritePrismaRepository } from '@microservice/schemify-microservice/example/infrastructure/adapters/outbounds/repositories/prisma/write/example-write.repository'
import { ExampleReadPrismaRepository } from '@microservice/schemify-microservice/example/infrastructure/adapters/outbounds/repositories/prisma/read/example-read.repository'

import { SharedModule } from '@microservice/schemify-microservice/libs/shared/shared.module'
import { ExampleMapper } from '@microservice/schemify-microservice/libs/shared/mappers/example.mapper'

@Module({
  imports: [PrismaModule, SharedModule],
  providers: [
    ExampleMapper,
    {
      provide: ExampleWriteRepository,
      useClass: ExampleWritePrismaRepository
    },
    {
      provide: ExampleReadRepository,
      useClass: ExampleReadPrismaRepository
    }
  ],
  exports: [ExampleWriteRepository, ExampleReadRepository]
})
export class RepositoriesModule {}
