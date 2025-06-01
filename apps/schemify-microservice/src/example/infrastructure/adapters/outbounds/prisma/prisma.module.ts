/**
 * PrismaModule
 * -----------------------------------------------------------------------------
 * Módulo responsable de registrar el servicio PrismaClient como un provider.
 * Este módulo se importa una sola vez y se exporta para cualquier otro
 * módulo que necesite acceso a la base de datos.
 */

import { PrismaService } from './prisma.service'

import { Module } from '@nestjs/common'
import { SharedModule } from '@example/libs/shared/shared.module'
import { ExampleMapper } from '@example/example/infrastructure/mappers/example.mapper'

// Puertos (abstract classes)
import {
  CreateExamplePort,
  UpdateExamplePort,
  DeleteExamplePort
} from '@example/example/application/ports/outbounds/repositories/example-command-ports'

import {
  GetAllExamplesPort,
  GetExampleByIdPort,
  GetExamplesWithCursorPort
} from '@example/example/application/ports/outbounds/repositories/example-query-ports'

// Adaptadores de salida (implementaciones)
import {
  CreateExamplePrismaRepository,
  UpdateExamplePrismaRepository,
  DeleteExamplePrismaRepository
} from './command'

import {
  GetAllExamplesPrismaRepository,
  GetExampleByIdPrismaRepository,
  GetExamplesWithCursorPrismaRepository
} from './query'

@Module({
  imports: [PrismaModule, SharedModule],
  providers: [
    ExampleMapper,
    PrismaService,

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
    GetExamplesWithCursorPort,
    PrismaService
  ]
})
export class PrismaModule {}
