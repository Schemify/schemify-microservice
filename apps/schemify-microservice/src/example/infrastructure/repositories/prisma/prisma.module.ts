/**
 * PrismaModule
 * -----------------------------------------------------------------------------
 * Módulo responsable de registrar el servicio PrismaClient como un provider.
 * Este módulo se importa una sola vez y se exporta para cualquier otro
 * módulo que necesite acceso a la base de datos.
 */

import { Module } from '@nestjs/common'
import { PrismaService } from './config/prisma.service'

@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
