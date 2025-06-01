import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { SharedModule } from '@example//libs/shared/shared.module'
import { ExampleMapper } from '@example//libs/shared/mappers/example.mapper'

// Puertos (abstract classes)
import {
  CreateExamplePort,
  UpdateExamplePort,
  DeleteExamplePort
} from '@example//example/application/ports/outbounds/repositories/example-command-ports'

import {
  GetAllExamplesPort,
  GetExampleByIdPort,
  GetExamplesWithCursorPort
} from '@example//example/application/ports/outbounds/repositories/example-query-ports'

// Adaptadores de salida (implementaciones)
import { CreateExamplePrismaRepository } from './prisma/command/create-example.repository'
import { UpdateExamplePrismaRepository } from './prisma/command/update-example.repository'
import { DeleteExamplePrismaRepository } from './prisma/command/delete-example.repository'

import { GetAllExamplesPrismaRepository } from './prisma/query/get-all-examples'
import { GetExampleByIdPrismaRepository } from './prisma/query/get-example-by-id'
import { GetExamplesWithCursorPrismaRepository } from './prisma/query/get-example-with-cursor.repository'

@Module({
  imports: [PrismaModule, SharedModule],
  providers: [
    ExampleMapper,

    // Command ports
    { provide: CreateExamplePort, useClass: CreateExamplePrismaRepository },
    { provide: UpdateExamplePort, useClass: UpdateExamplePrismaRepository },
    { provide: DeleteExamplePort, useClass: DeleteExamplePrismaRepository },

    // Query ports
    { provide: GetExampleByIdPort, useClass: GetExampleByIdPrismaRepository },
    { provide: GetAllExamplesPort, useClass: GetAllExamplesPrismaRepository },
    {
      provide: GetExamplesWithCursorPort,
      useClass: GetExamplesWithCursorPrismaRepository
    }
  ],
  exports: [
    CreateExamplePort,
    UpdateExamplePort,
    DeleteExamplePort,
    GetExampleByIdPort,
    GetAllExamplesPort,
    GetExamplesWithCursorPort
  ]
})
export class RepositoriesModule {}
