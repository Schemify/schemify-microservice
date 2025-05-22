// 📁 repositories.module.ts

import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/config/prisma.module'

// Implementaciones técnicas
import { ExampleReadPrismaRepository } from './prisma/read/example-read.repository'
import { ExampleWritePrismaRepository } from './prisma/write/example-write.repository'

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: 'ExampleReadRepository',
      useClass: ExampleReadPrismaRepository
    },
    {
      provide: 'ExampleWriteRepository',
      useClass: ExampleWritePrismaRepository
    }
  ],
  exports: ['ExampleReadRepository', 'ExampleWriteRepository']
})
export class RepositoriesModule {}
