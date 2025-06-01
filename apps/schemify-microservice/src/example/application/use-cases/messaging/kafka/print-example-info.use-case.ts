import { Injectable } from '@nestjs/common'

import { ExampleCreatedEvent } from '@example//example/domain/events/example-created.event'
import { ExampleEventPublisherPort } from '@example//example/application/ports/outbounds/messaging/example-event-publisher.port'

@Injectable()
export class PrintExampleInfoUseCase {
  constructor(private readonly publisher: ExampleEventPublisherPort) {}

  /**
   * Imprime la información del evento `ExampleCreatedEvent` en la consola.
   *
   * @param event Evento de creación de ejemplo
   */
  async execute(event: ExampleCreatedEvent): Promise<void> {
    console.log('🪐 [UseCase] PrintExampleInfoUseCase executing with:', event)
    await this.publisher.publishCreatedEvent(event)
  }
}
