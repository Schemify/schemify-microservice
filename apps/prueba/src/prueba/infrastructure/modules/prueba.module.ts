import { Module } from '@nestjs/common'

import { PruebaGrpcController } from '../controllers/prueba.grpc.controller'
import { PruebaApplicationService } from '../../application/services/prueba-application.service'
import { PruebaMapper } from '../../application/mappers/prueba.mapper'

// import { PruebaRepository } from '../../domain/repositories/prueba.repository'
import { PrismaPruebaRepository } from '../persistence/prisma/prueba-prisma.repository.ts'
import { PrismaModule } from '../persistence/prisma/prisma.module'

import { KafkaModule } from '../messaging/kafka/kafka.module'

@Module({
  imports: [PrismaModule, KafkaModule],
  providers: [
    PruebaApplicationService,
    PruebaMapper,
    {
      provide: 'PruebaRepository',
      useClass: PrismaPruebaRepository
    }
  ],
  controllers: [PruebaGrpcController]
})
export class PruebaInfrastructureModule {}
