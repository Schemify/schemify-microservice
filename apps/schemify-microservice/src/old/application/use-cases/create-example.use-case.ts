// // un caso de uso es una acción o tarea que la aplicación debe realizar
// //orquesta las interacciones entre el dominio y la infraestructura para lograr un
// // objetivo específico, como crear una entidad, actualizar un registro, enviar un
// // evento, etc.

// import { Injectable } from '@nestjs/common'
// import { ExampleCreatedEvent } from '../../domain/events/example-created.event'

// @Injectable()
// export class ExampleCreatedUseCase {
//   processEvent(event: ExampleCreatedEvent) {
//     // Log de evento recibido
//     console.log('📥 Evento recibido desde Kafka:')
//     console.log('📝 Mensaje tipado:', event)

//     // Calcular el tamaño estimado del mensaje
//     const sizeInBytes = Buffer.byteLength(JSON.stringify(event), 'utf8')
//     console.log(`📦 Tamaño estimado: ${sizeInBytes} bytes`)
//   }
// }
