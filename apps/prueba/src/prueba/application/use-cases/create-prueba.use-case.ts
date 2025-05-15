import { Injectable } from '@nestjs/common'
import { PruebaCreatedEvent } from '../../domain/events/prueba-created.event'

@Injectable()
export class PruebaCreatedUseCase {
  processEvent(event: PruebaCreatedEvent) {
    // Log de evento recibido
    console.log('📥 Evento recibido desde Kafka:')
    console.log('📝 Mensaje tipado:', event)

    // Calcular el tamaño estimado del mensaje
    const sizeInBytes = Buffer.byteLength(JSON.stringify(event), 'utf8')
    console.log(` 📦 Tamaño estimado: ${sizeInBytes} bytes `)
  }
}
