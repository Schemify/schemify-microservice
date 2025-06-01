/* eslint-disable @darraghor/nestjs-typed/controllers-should-supply-api-tags */
/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */
import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'

import { ExampleCreatedEvent } from '@example//example/domain/events/example-created.event'
/**
 * Consumer de eventos externos (Kafka) para `example.created`
 *
 * Este listener transforma un mensaje Kafka plano en un comando del caso de uso
 * para que sea manejado por la capa de aplicación.
 */
@Controller()
export class ExampleCreatedConsumer {
  constructor() {}

  @EventPattern('example.created')
  handle(@Payload() message: ExampleCreatedEvent) {
    console.log('Mensaje recibido:', message)
  }
}
