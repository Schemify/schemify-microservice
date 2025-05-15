/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */

import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PruebaEntity } from '../../../domain/entities/prueba.entity'
import { PruebaRepository } from '../../../domain/repositories/prueba.repository'

@Injectable()
export class PrismaPruebaRepository implements PruebaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(entity: PruebaEntity): Promise<PruebaEntity> {
    const saved = await this.prisma.prueba.upsert({
      where: { id: entity.id },
      create: {
        id: entity.id,
        name: entity.name,
        description: entity.description.value,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt
      },
      update: {
        name: entity.name,
        description: entity.description.value,
        updatedAt: new Date()
      }
    })

    return PruebaEntity.reconstruct({
      id: saved.id,
      name: saved.name,
      description: saved.description ?? '',
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt
    })
  }

  async findById(id: string): Promise<PruebaEntity | null> {
    const result = await this.prisma.prueba.findUnique({ where: { id } })

    if (!result) return null

    return PruebaEntity.reconstruct({
      id: result.id,
      name: result.name,
      description: result.description ?? '',
      createdAt: result.createdAt,
      updatedAt: result.updatedAt
    })
  }

  async findAll(): Promise<PruebaEntity[]> {
    const results = await this.prisma.prueba.findMany()

    return results.map((result) =>
      PruebaEntity.reconstruct({
        id: result.id,
        name: result.name,
        description: result.description ?? '',
        createdAt: result.createdAt,
        updatedAt: result.updatedAt
      })
    )
  }
  async update(id: string, entity: PruebaEntity): Promise<PruebaEntity> {
    const updated = await this.prisma.prueba.update({
      where: { id },
      data: {
        name: entity.name,
        description: entity.description.value,
        updatedAt: new Date()
      }
    })

    return PruebaEntity.reconstruct({
      id: updated.id,
      name: updated.name,
      description: updated.description ?? '',
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.prueba.delete({ where: { id } })
  }
}
