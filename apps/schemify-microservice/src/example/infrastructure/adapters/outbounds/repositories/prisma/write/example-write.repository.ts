/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */
import { Injectable } from '@nestjs/common'

// Entidades del dominio
import { ExampleEntity } from '@microservice/schemify-microservice/example/domain/entities/example.entity'

// ✅ Puerto de salida (dominio)
import { PrismaService } from '@microservice/schemify-microservice/example/infrastructure/adapters/outbounds/repositories/prisma/config/prisma.service'

// ✅ Adaptador de salida (infraestructura)
import { ExampleWriteRepository } from '@microservice/schemify-microservice/example/domain/ports/outbounds/example-write.repository'

@Injectable()
export class ExampleWritePrismaRepository implements ExampleWriteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: ExampleEntity): Promise<void> {
    await this.prisma.example.create({
      data: {
        id: entity.id,
        name: entity.props.name.value,
        description: entity.props.description?.value ?? null,
        createdAt: entity.props.createdAt,
        updatedAt: entity.props.updatedAt
      }
    })
  }

  async update(entity: ExampleEntity): Promise<void> {
    await this.prisma.example.update({
      where: { id: entity.id },
      data: {
        name: entity.props.name.value,
        description: entity.props.description?.value ?? null,
        updatedAt: entity.props.updatedAt
      }
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.example.delete({ where: { id } })
  }
}
