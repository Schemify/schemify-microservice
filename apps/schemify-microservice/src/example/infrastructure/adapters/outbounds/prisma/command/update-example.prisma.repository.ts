/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */
import { Injectable } from '@nestjs/common'

// Entidades del dominio
import { ExampleEntity } from '@example/example/domain/entities/example.entity'

// ✅ Puerto de salida (dominio)
import { PrismaService } from '@example/example/infrastructure/adapters/outbounds/prisma/prisma.service'

// ✅ Adaptador de salida (infraestructura)
import { UpdateExamplePort } from '@example/example/application/ports/outbounds/repositories/example-command-ports'

@Injectable()
export class UpdateExamplePrismaRepository implements UpdateExamplePort {
  constructor(private readonly prisma: PrismaService) {}

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
}
