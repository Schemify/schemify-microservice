/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@microservice/schemify-microservice/example/infrastructure/repositories/prisma/config/prisma.service'
import { ExampleEntity } from '@microservice/schemify-microservice/example/domain/entities/example.entity'
import { ExampleReadRepository } from '@microservice/schemify-microservice/example/domain/repositories/example-read-repository'

@Injectable()
export class ExampleReadPrismaRepository implements ExampleReadRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ExampleEntity[]> {
    const results = await this.prisma.example.findMany()
    return results.map((result) =>
      ExampleEntity.fromPrimitives({
        id: result.id,
        name: result.name,
        description: result.description ?? undefined,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt
      })
    )
  }

  async findById(id: string): Promise<ExampleEntity | null> {
    const result = await this.prisma.example.findUnique({ where: { id } })

    if (!result) return null

    return ExampleEntity.fromPrimitives({
      id: result.id,
      name: result.name,
      description: result.description ?? undefined,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt
    })
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
      items: sliced.map((r) =>
        ExampleEntity.fromPrimitives({
          id: r.id,
          name: r.name,
          description: r.description ?? undefined,
          createdAt: r.createdAt,
          updatedAt: r.updatedAt
        })
      ),
      nextCursor: last?.id ?? null,
      hasMore
    }
  }
}
