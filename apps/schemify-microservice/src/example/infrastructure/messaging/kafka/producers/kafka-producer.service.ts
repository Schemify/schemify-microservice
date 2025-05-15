import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { Kafka, Producer } from 'kafkajs'

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  private kafka = new Kafka({
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
    clientId: 'example-app'
  })

  private producer: Producer = this.kafka.producer()

  async onModuleInit() {
    await this.producer.connect()
  }

  async onModuleDestroy() {
    await this.producer.disconnect()
  }

  async emit(topic: string, message: Record<string, any>) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }]
    })
  }
}
