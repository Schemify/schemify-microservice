import { Module } from '@nestjs/common'
import { Transport, MicroserviceOptions } from '@nestjs/microservices'

import { GrpcQueryControllers } from './query'
import { GrpcCommandControllers } from './command'

import { example } from '@proto'
import { PROTO_PATHS } from '@example/example/infrastructure/shared/constants/proto-paths'

import { CqrsModule } from '@nestjs/cqrs'

import { SharedModule } from '@example/libs/shared/shared.module'

import { ApplicationModule } from '@example/example/application/application.module'

@Module({
  imports: [CqrsModule, SharedModule, ApplicationModule],
  controllers: [...GrpcQueryControllers, ...GrpcCommandControllers]
})
export class GrpcServerModule {
  static transport(): MicroserviceOptions {
    return {
      transport: Transport.GRPC,
      options: {
        package: example.EXAMPLE_PACKAGE_NAME,
        protoPath: PROTO_PATHS.example,
        url: process.env.SERVICE_GRPC_URL
      }
    }
  }
}
