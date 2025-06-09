/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */
import { Injectable } from '@nestjs/common'

// Entidad del dominio
import { ExampleEntity } from '@example/example/domain/entities/example.entity'

// ✅ Adaptador de salida (infraestructura)
import { PrismaService } from '@example/example/infrastructure/adapters/outbounds/prisma/prisma.service'

// ✅ Puerto de salida (dominio)
import { GetAllExamplesPort } from '@example/example/application/ports/outbounds/repositories/example-query-ports'

import { ExampleMapper } from '@example/example/infrastructure/mappers/example.mapper'

@Injectable()
export class GetAllExamplesPrismaRepository implements GetAllExamplesPort {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: ExampleMapper
  ) {}

  async getAll(): Promise<ExampleEntity[]> {
    const results = await this.prisma.example.findMany()
    return results.map((result) => this.mapper.fromPrimitives(result))
  }
}
