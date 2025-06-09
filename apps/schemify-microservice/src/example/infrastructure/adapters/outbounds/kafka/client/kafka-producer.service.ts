/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */
import {
  Injectable,
  Inject,
  OnModuleInit,
  OnApplicationShutdown
} from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'

/**
 * 🌐 KafkaProducerService
 * ----------------------
 * • Mantiene **una sola conexión** a Kafka por proceso
 * • Reintenta lazy-connect en el primer `emit`
 * • Cierra limpio al apagar la app
 */
@Injectable()
export class KafkaProducerService
  implements OnModuleInit, OnApplicationShutdown
{
  private ready = false

  constructor(@Inject('KAFKA_PRODUCER') private readonly client: ClientKafka) {}

  /** Conecta el producer (idempotente) */
  async onModuleInit(): Promise<void> {
    if (!this.ready) {
      await this.client.connect()
      this.ready = true
    }
  }

  /**
   * Publica un mensaje y devuelve el resultado del broker.
   * Se asegura de que el producer esté conectado.
   */
  async emit(topic: string, payload: any): Promise<unknown> {
    await this.onModuleInit()
    return lastValueFrom(this.client.emit(topic, payload))
  }

  /** Cierra la conexión al terminar la aplicación */
  async onApplicationShutdown(): Promise<void> {
    if (this.ready) await this.client.close()
  }
}
