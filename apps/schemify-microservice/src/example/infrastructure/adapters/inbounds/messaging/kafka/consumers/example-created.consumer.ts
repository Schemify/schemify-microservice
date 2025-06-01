/* eslint-disable @darraghor/nestjs-typed/controllers-should-supply-api-tags */
/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */

import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'

import { ExampleCreatedEvent } from '@example//example/domain/events/example-created.event'
import { Envelope } from '@example/libs/shared/events/event-envelope'
import { QueryBus } from '@nestjs/cqrs'

import { GetExampleByIdQuery } from '@example/example/application/ports/inbounds/queries'

@Controller()
export class ExampleCreatedConsumer {
  constructor(private readonly queryBus: QueryBus) {}

  @EventPattern('example.created')
  async handle(@Payload() env: Envelope) {
    try {
      if (env.type !== 'ExampleCreated' || env.version !== 1) return

      const evt = env.payload as ExampleCreatedEvent

      const query = new GetExampleByIdQuery({ id: evt.example.id })

      const event = await this.queryBus.execute(query)

      console.log('✅ Ejemplo recuperado por ID:', event)
    } catch (error) {
      console.error('❌ Error al decodificar el mensaje:', error)
      // Aquí podrías lanzar un error o manejarlo según tu lógica de negocio
    }
  }
}
