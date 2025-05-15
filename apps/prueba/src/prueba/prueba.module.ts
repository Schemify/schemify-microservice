import { Module } from '@nestjs/common'

import { PruebaInfrastructureModule } from './infrastructure/modules/prueba.module'

@Module({
  imports: [PruebaInfrastructureModule],
  controllers: [],
  providers: [],
  exports: []
})
export class PruebaModule {}
