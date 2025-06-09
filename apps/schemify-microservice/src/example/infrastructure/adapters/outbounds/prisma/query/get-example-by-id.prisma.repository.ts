/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */
import { Injectable } from '@nestjs/common'

// Entidad del dominio
import { ExampleEntity } from '@example/example/domain/entities/example.entity'

// ✅ Adaptador de salida (infraestructura)
import { PrismaService } from '@example/example/infrastructure/adapters/outbounds/prisma/prisma.service'

// ✅ Puerto de salida (dominio)
import { GetExampleByIdPort } from '@example/example/application/ports/outbounds/repositories/example-query-ports'

import { ExampleMapper } from '@example/example/infrastructure/mappers/example.mapper'

@Injectable()
export class GetExampleByIdPrismaRepository implements GetExampleByIdPort {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: ExampleMapper
  ) {}

  async getById(id: string): Promise<ExampleEntity | null> {
    const result = await this.prisma.example.findUnique({ where: { id } })

    if (!result) return null

    return this.mapper.fromPrimitives(result)
  }
}
