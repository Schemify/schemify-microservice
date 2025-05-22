/**
 * PrismaService
 * -----------------------------------------------------------------------------
 * Encapsula PrismaClient y lo adapta al ciclo de vida de NestJS:
 * - Conecta automáticamente al iniciar el módulo
 * - Desconecta automáticamente al apagar la app
 * - Expone una instancia reutilizable para inyección
 */

import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy
} from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name)

  /**
   * Se ejecuta automáticamente cuando el módulo se inicializa.
   * Establece la conexión con la base de datos.
   */
  async onModuleInit(): Promise<void> {
    try {
      await this.$connect()
      this.logger.log('✅ Prisma conectado correctamente')
    } catch (err) {
      this.logger.error('❌ Error conectando a la base de datos:', err)
      throw err
    }
  }

  /**
   * Se ejecuta al destruir el módulo (por ejemplo, al cerrar la app).
   * Libera los recursos y desconecta de la base de datos.
   */
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect()
    this.logger.log('🛑 Prisma desconectado')
  }
}
