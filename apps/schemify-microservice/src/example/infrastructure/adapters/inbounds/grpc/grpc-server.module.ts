import { Module } from '@nestjs/common'
import { Transport, MicroserviceOptions } from '@nestjs/microservices'
import { join } from 'path'

import { GrpcQueryControllers } from './query'
import { GrpcCommandControllers } from './command'

import { example } from '@app/proto'
import { PROTO_PATHS } from '@microservice/schemify-microservice/example/infrastructure/shared/constants/proto-paths'
import { ApplicationModule } from '@microservice/schemify-microservice/example/application/application.module'

@Module({
  imports: [ApplicationModule],
  controllers: [...GrpcQueryControllers, ...GrpcCommandControllers]
})
export class GrpcServerModule {
  static transport(): MicroserviceOptions {
    return {
      transport: Transport.GRPC,
      options: {
        package: example.EXAMPLE_PACKAGE_NAME,
        protoPath: join(__dirname, '..', PROTO_PATHS.example),
        url: '0.0.0.0:50051'
      }
    }
  }
}
