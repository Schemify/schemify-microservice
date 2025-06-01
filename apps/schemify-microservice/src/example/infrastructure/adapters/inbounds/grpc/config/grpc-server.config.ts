import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { example } from '@proto'

import { PROTO_PATHS } from '@example//example/infrastructure/shared/constants/proto-paths'

export function grpcServerOptions(): MicroserviceOptions {
  return {
    transport: Transport.GRPC,
    options: {
      package: example.EXAMPLE_PACKAGE_NAME,
      protoPath: join(__dirname, '..', PROTO_PATHS.example),
      url: '0.0.0.0:50051'
    }
  }
}
