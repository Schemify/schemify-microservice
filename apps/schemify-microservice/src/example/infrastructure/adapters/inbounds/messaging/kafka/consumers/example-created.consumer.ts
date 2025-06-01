/* eslint-disable @darraghor/nestjs-typed/controllers-should-supply-api-tags */
/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */

import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'

import { ExampleCreatedEvent } from '@example//example/domain/events/example-created.event'
import { Envelope } from '@example/libs/shared/events/event-envelope'

@Controller()
export class ExampleCreatedConsumer {
  @EventPattern('example.created')
  handle(@Payload() env: Envelope) {
    try {
      if (env.type !== 'ExampleCreated' || env.version !== 1) return

      const evt = env.payload as ExampleCreatedEvent
      console.log('✅ Mensaje decodificado:', evt)
    } catch (error) {
      console.error('❌ Error al decodificar el mensaje:', error)
      // Aquí podrías lanzar un error o manejarlo según tu lógica de negocio
    }
  }
}
