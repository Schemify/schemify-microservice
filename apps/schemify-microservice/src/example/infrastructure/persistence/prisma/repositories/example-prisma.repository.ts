/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */

import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { ExampleEntity } from '@microservice/schemify-microservice/example/domain/entities/example.entity'
import { ExampleRepository } from '@microservice/schemify-microservice/example/domain/repositories/example.repository'

@Injectable()
export class PrismaExampleRepository implements ExampleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: ExampleEntity): Promise<ExampleEntity> {
    const created = await this.prisma.example.create({
      data: {
        id: entity.id,
        name: entity.props.name.value,
        description: entity.props.description?.value ?? null,
        createdAt: entity.props.createdAt,
        updatedAt: entity.props.updatedAt ?? new Date()
      }
    })

    return ExampleEntity.fromPrimitives({
      id: created.id,
      name: created.name,
      description: created.description ?? '',
      createdAt: created.createdAt,
      updatedAt: created.updatedAt
    })
  }

  async update(id: string, entity: ExampleEntity): Promise<ExampleEntity> {
    const updated = await this.prisma.example.update({
      where: { id },
      data: {
        name: entity.props.name.value,
        description: entity.props.description?.value ?? null,
        updatedAt: new Date()
      }
    })

    return ExampleEntity.fromPrimitives({
      id: updated.id,
      name: updated.name,
      description: updated.description ?? '',
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt
    })
  }

  async findById(id: string): Promise<ExampleEntity | null> {
    const result = await this.prisma.example.findUnique({
      where: { id }
    })

    if (!result) return null

    return ExampleEntity.fromPrimitives({
      id: result.id,
      name: result.name,
      description: result.description ?? '',
      createdAt: result.createdAt,
      updatedAt: result.updatedAt
    })
  }

  async findAll(): Promise<ExampleEntity[]> {
    const results = await this.prisma.example.findMany()

    return results.map((result) =>
      ExampleEntity.fromPrimitives({
        id: result.id,
        name: result.name,
        description: result.description ?? '',
        createdAt: result.createdAt,
        updatedAt: result.updatedAt
      })
    )
  }

  async delete(id: string): Promise<void> {
    await this.prisma.example.delete({
      where: { id }
    })
  }

  async findWithCursor(
    afterId: string,
    limit: number
  ): Promise<{
    items: ExampleEntity[]
    nextCursor: string | null
    hasMore: boolean
  }> {
    const take = limit + 1

    const results = await this.prisma.example.findMany({
      take,
      skip: afterId ? 1 : 0,
      cursor: afterId ? { id: afterId } : undefined,
      orderBy: { id: 'asc' }
    })

    const hasMore = results.length > limit
    const items = hasMore ? results.slice(0, -1) : results
    const nextCursor = hasMore ? items[items.length - 1].id : null

    return {
      items: items.map((result) =>
        ExampleEntity.fromPrimitives({
          id: result.id,
          name: result.name,
          description: result.description ?? '',
          createdAt: result.createdAt,
          updatedAt: result.updatedAt
        })
      ),
      nextCursor,
      hasMore
    }
  }
}

//   async save(entity: ExampleEntity): Promise<ExampleEntity> {
//     const saved = await this.prisma.example.upsert({
//       where: { id: entity.id },
//       create: {
//         id: entity.id,
//         name: entity.name,
//         description: entity.description.value,
//         createdAt: entity.createdAt,
//         updatedAt: entity.updatedAt
//       },
//       update: {
//         name: entity.name,
//         description: entity.description.value,
//         updatedAt: new Date()
//       }
//     })

//     return ExampleEntity.reconstruct({
//       id: saved.id,
//       name: saved.name,
//       description: saved.description ?? '',
//       createdAt: saved.createdAt,
//       updatedAt: saved.updatedAt
//     })
//   }

//   async findById(id: string): Promise<ExampleEntity | null> {
//     const result = await this.prisma.example.findUnique({ where: { id } })

//     if (!result) return null

//     return ExampleEntity.reconstruct({
//       id: result.id,
//       name: result.name,
//       description: result.description ?? '',
//       createdAt: result.createdAt,
//       updatedAt: result.updatedAt
//     })
//   }

//   async findAll(): Promise<ExampleEntity[]> {
//     const results = await this.prisma.example.findMany()

//     return results.map((result) =>
//       ExampleEntity.reconstruct({
//         id: result.id,
//         name: result.name,
//         description: result.description ?? '',
//         createdAt: result.createdAt,
//         updatedAt: result.updatedAt
//       })
//     )
//   }
//   async update(id: string, entity: ExampleEntity): Promise<ExampleEntity> {
//     const updated = await this.prisma.example.update({
//       where: { id },
//       data: {
//         name: entity.name,
//         description: entity.description.value,
//         updatedAt: new Date()
//       }
//     })

//     return ExampleEntity.reconstruct({
//       id: updated.id,
//       name: updated.name,
//       description: updated.description ?? '',
//       createdAt: updated.createdAt,
//       updatedAt: updated.updatedAt
//     })
//   }

//   async delete(id: string): Promise<void> {
//     await this.prisma.example.delete({ where: { id } })
//   }

//   async findWithCursor(
//     afterId: string,
//     limit: number
//   ): Promise<{
//     items: ExampleEntity[]
//     nextCursor: string | null
//     hasMore: boolean
//   }> {
//     const take = limit + 1

//     const examples = await this.prisma.example.findMany({
//       take,
//       skip: afterId ? 1 : 0,
//       cursor: afterId ? { id: afterId } : undefined,
//       orderBy: { id: 'asc' }
//     })

//     const hasMore = examples.length > limit
//     const results = hasMore ? examples.slice(0, -1) : examples
//     const nextCursor = hasMore ? results[results.length - 1].id : null

//     return {
//       items: results.map((e) =>
//         ExampleEntity.reconstruct({
//           id: e.id,
//           name: e.name,
//           description: e.description ?? '',
//           createdAt: e.createdAt,
//           updatedAt: e.updatedAt
//         })
//       ),
//       nextCursor,
//       hasMore
//     }
//   }
// }
