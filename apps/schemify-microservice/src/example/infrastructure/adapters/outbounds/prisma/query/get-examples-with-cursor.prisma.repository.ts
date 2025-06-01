/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */
import { Injectable } from '@nestjs/common'

// ✅ Adaptador de salida (infraestructura)
import { PrismaService } from '@example/example/infrastructure/adapters/outbounds/prisma/prisma.service'

// ✅ Puerto de salida (dominio)
import { GetExamplesWithCursorPort } from '@example/example/application/ports/outbounds/repositories/example-query-ports'

import { ExampleMapper } from '@example/example/infrastructure/mappers/example.mapper'

@Injectable()
export class GetExamplesWithCursorPrismaRepository
  implements GetExamplesWithCursorPort
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: ExampleMapper
  ) {}

  async getWithCursor(afterId: string, limit: number) {
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
