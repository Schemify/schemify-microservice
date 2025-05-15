/* eslint-disable @darraghor/nestjs-typed/controllers-should-supply-api-tags */

import { Controller, Inject } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { PruebaCreatedEvent } from '../../../../domain/events/prueba-created.event'
import { PruebaCreatedUseCase } from '../../../../application/use-cases/create-prueba.use-case'

@Controller()
export class PruebaCreatedConsumer {
  constructor(
    @Inject(PruebaCreatedUseCase)
    private readonly pruebaUseCase: PruebaCreatedUseCase
  ) {}

  @MessagePattern('prueba-created')
  handlePruebaCreated(@Payload() message: PruebaCreatedEvent) {
    try {
      this.pruebaUseCase.processEvent(message)
    } catch (error) {
      console.error('❌ Error al procesar mensaje Kafka:', error)
    }
  }
}
