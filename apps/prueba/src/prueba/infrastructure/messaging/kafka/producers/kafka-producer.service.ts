import { Injectable, Inject, OnModuleInit } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'

// import { Prueba } from '@app/proto'
import { PruebaCreatedEvent } from '../../../../domain/events/prueba-created.event'
import { DescriptionValueObject } from '../../../../domain/value-objects/description.value-object'

@Injectable()
export class KafkaProducerService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_PRODUCER') private readonly producer: ClientKafka
  ) {}

  async onModuleInit() {
    await this.producer.connect()
  }

  async emitPruebaCreated(topic: string, payload: any) {
    const event = new PruebaCreatedEvent({
      id: payload.id,
      name: payload.name,
      description: new DescriptionValueObject(payload.description),
      occurredAt: new Date()
    })

    const message = {
      key: event.id.toString(),
      value: JSON.stringify(event)
    }

    const sizeInBytes = Buffer.byteLength(message.value, 'utf8')

    if (sizeInBytes > 1024 * 1024) {
      throw new Error('❌ Payload demasiado grande para Kafka (> 1MB)')
    }

    await lastValueFrom(this.producer.emit(topic, message))
  }
}
