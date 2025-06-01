/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */
import { Injectable } from '@nestjs/common'

// ✅ Puerto de salida (dominio)
import { PrismaService } from '@example//example/infrastructure/adapters/outbounds/repositories/prisma/config/prisma.service'

// ✅ Adaptador de salida (infraestructura)
import { DeleteExamplePort } from '@example//example/application/ports/outbounds/repositories/example-command-ports'

@Injectable()
export class DeleteExamplePrismaRepository implements DeleteExamplePort {
  constructor(private readonly prisma: PrismaService) {}

  async delete(id: string): Promise<void> {
    await this.prisma.example.delete({ where: { id } })
  }
}
