/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */
import { Injectable } from '@nestjs/common'

// Entidades del dominio
import { ExampleEntity } from '@example/example/domain/entities/example.entity'

// ✅ Puerto de salida (dominio)
import { PrismaService } from '@example/example/infrastructure/adapters/outbounds/prisma/prisma.service'

// ✅ Adaptador de salida (infraestructura)
import { CreateExamplePort } from '@example/example/application/ports/outbounds/repositories/example-command-ports'
import { ExampleMapper } from '@example/example/infrastructure/mappers/example.mapper'

@Injectable()
export class CreateExamplePrismaRepository implements CreateExamplePort {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: ExampleMapper
  ) {}

  async create(entity: ExampleEntity): Promise<ExampleEntity> {
    const createdEntity = await this.prisma.example.create({
      data: {
        id: entity.id,
        name: entity.props.name.value,
        description: entity.props.description?.value ?? null,
        createdAt: entity.props.createdAt,
        updatedAt: entity.props.updatedAt
      }
    })

    // Convertimos el resultado a una entidad del dominio
    return this.mapper.fromPrimitives(createdEntity)
  }
}
