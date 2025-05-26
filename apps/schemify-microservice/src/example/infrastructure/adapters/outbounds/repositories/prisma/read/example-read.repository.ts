/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */
import { Injectable } from '@nestjs/common'

// Entidad del dominio
import { ExampleEntity } from '@microservice/schemify-microservice/example/domain/entities/example.entity'

// ✅ Adaptador de salida (infraestructura)
import { PrismaService } from '@microservice/schemify-microservice/example/infrastructure/adapters/outbounds/repositories/prisma/config/prisma.service'

// ✅ Puerto de salida (dominio)
import { ExampleReadRepository } from '@microservice/schemify-microservice/example/domain/ports/outbounds/example-read-repository'

import { ExampleMapper } from '@microservice/schemify-microservice/libs/shared/mappers/example.mapper'

@Injectable()
export class ExampleReadPrismaRepository implements ExampleReadRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: ExampleMapper
  ) {}

  async findAll(): Promise<ExampleEntity[]> {
    const results = await this.prisma.example.findMany()
    return results.map((result) => this.mapper.fromPrimitives(result))
  }

  async findById(id: string): Promise<ExampleEntity | null> {
    const result = await this.prisma.example.findUnique({ where: { id } })

    if (!result) return null

    return this.mapper.fromPrimitives(result)
  }

  async findWithCursor(afterId: string, limit: number) {
    const take = limit + 1
    const results = await this.prisma.example.findMany({
      take,
      ...(afterId && { cursor: { id: afterId }, skip: 1 }),
      orderBy: { id: 'asc' }
    })

    const hasMore = results.length > limit
    const sliced = hasMore ? results.slice(0, -1) : results
    const last = sliced.at(-1)

    return {
      items: sliced.map((r) => this.mapper.fromPrimitives(r)),
      nextCursor: last?.id ?? null,
      hasMore
    }
  }
}
